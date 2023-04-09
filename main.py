from ast import List
from collections import Counter
from pydantic import BaseModel
import torch
from fastapi import FastAPI
from pyvi import ViTokenizer
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import re
import pyodbc
import datetime
import emoji
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [    "http://localhost",    "http://localhost:3000",]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# tạo kết nối đến SQL Server
conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=DESKTOP-JOPKD9H;'
                      'Database=NETFarm;'
                      'Trusted_Connection=yes;')

# tạo đối tượng cursor
cursor = conn.cursor()

class Feedback(BaseModel):
    contents:str
    star:int
    productId:int
    userId:int
    sentiment:str = ""
    userName:str = ""
def preprocess_text(text):
    # Loại bỏ các icon trong chuỗi  
    text = re.sub(r'[^\w\s]', '', text)
    
    # Chuẩn hóa bằng hàm lowercase_text
    text = text.lower()

     # loại bỏ trường hợp lặp lại các âm tiết
    text = re.sub(r'(\w)\1{1,}', r'\1', text)
    
     # Get the list of emojis in the string
    text = remove_emojis(text)


    # Thay thế các chữ viết tắt thường gặp thành từ đúng
    acronym_dict = {
        'a':'anh','ae': 'anh em','aiu': 'anh yêu','aj': 'ai',        
        'bt': 'biết','bth':'bình thường','bl': 'bình luận',
        'bk': 'bách khoa','bn': 'bao nhiêu',
        'bm': 'bố mẹ','bv': 'bệnh viện','bx': 'bữa','bs': 'bác sĩ',
        'bit': 'biết','bằg': 'bằng','bùn': 'buồn','bh': 'bao giờ',
        'cv': 'công việc','cx': 'cũng', 
        'uet': 'đại học công nghệ', 'ct': 'chia tay','ce': 'chị em',
        'cs': 'có','cg': 'cũng','ch': 'chưa', 'cj':'cái gì', 'ck': 'chồng',
        'cz': 'cũng vậy', 'cb': 'chuẩn bị', 'cn': 'chủ nhật',
        'dc': 'được', 'dk': 'đăng ký','dr': 'đúng rồi','dt':'điện thoại','đ': 'đồng',
        'dth': 'dễ thương','dx': 'được','dv':'dịch vụ', 'dj': 'đi', 'dzui':'vui',
        'ez':'dễ', 'ex':'ví dụ', 'e':'em',
        'f': 'phải', 'fk':'phải không', 'fl': 'theo dõi','fb':'facebook','fai':'phải',
        'gd':'gia đình','ht': 'hết','hs': 'học sinh','hk': 'không', 'hc': 'học', 'h': 'giờ',
        'hog': 'không','HN': 'hà nội','iu': 'yêu', 'ig': 'instagram', 'ib': 'nhắn tin',
        'j': 'gì', 'ji': 'gì',
        'ko': 'không', 'ko': 'không', 'k': 'không', 'kq': 'kết quả', 'kt': 'kiểm tra',
        'kp': 'không phải', 'kd': 'kinh doanh','kh': 'không', 'kh': 'khách hàng',
        'kb': 'không biết','kn': 'kinh nghiệm', 'lq': 'liên quan',
        'lh': 'liên hệ', 'ljd': 'làm gì đó', 'lm': 'làm', 'lj': 'làm gì', 'lun': 'luôn',
        'm': 'mình', 'mn': 'mọi người', 'mt': 'máy tính', 'mh': 'mình', 'mk': 'mình', 'mng': 'mọi người',  
        'mih': 'mình','mik': 'mình', 'mún': 'muốn', 'nt': 'nhắn tin',
        'ny':'người yêu', 'ns': 'nói','nd': 'nội dung','ng': 'người',
        'nj': 'ni','nz': 'nữa','nx': 'nữa','nc': 'nói chuyện', 'nge': 'nghe',
        'ngi': 'nghĩ','nc': 'nước','nhug': 'nhưng','nhưg': 'nhưng','ntn': 'như thế nào', 
        'n': 'nhiều','nh': 'nhiều','nh': 'nhiều','noi': 'nói', 'nhìu': 'nhiều', 'ok': 'được', 
        'o': 'không','pr': 'quảng cáo', 'pp': 'phương pháp', 'ps': 'tái bút', 'pk': 'phải không',
        'pv': 'phỏng vấn','pm': 'nhắn tin', 'pik': 'biết', 'ph': 'phải', 'qt': 'quan trọng', 
        'qh': 'quan hệ', 'qc': 'quảng cáo', 'rp': 'báo cáo', 'rg': 'sao', 'rk': 'vậy', 
        'rag':'sao','sr': 'xin lỗi','ss': 'so sánh','sd': 'sử dụng','sg': 'sài gòn',
        'sh': 'sinh hoạt','sk': 'sức khoẻ','sl': 'số lượng','sx': 'sản xuất','sv': 'sinh viên',
        'sn': 'sinh nhật','sp': 'sản phẩm', 'sm': 'sớm', 'sg': 'sống',
        'tw': 'trung ương','ty': 'tình yêu','tp': 'thành phố','TK': 'tài khoản','tl': 'trả lời',
        'tb': 'thông báo','tn': 'tin nhắn','tt': 'thông tin', 'thik': 'thích',
        'tr': 'trời', 'thk': 'thằng', 'tk': 'thằng',
        'uh': 'ừ','uk': 'ừ','um': 'ừ','u': 'ừ','uog': 'uống',
        'vp': 'văn phòng','vd': 'ví dụ', 'vg': 'vâng', 'vk': 'vợ', 'vc': 'việc', 'vag': 'vâng',
        'wen': 'quen','wê': 'quê', 'wá': 'quá', 'xog': 'xong', 'xg': 'xong',
    }
    words = text.split(' ')
    words = [acronym_dict[word] if word in acronym_dict else word for word in words]
    text = ' '.join(words)

    
    # Thay thế các link bằng "Link_spam"
    text = re.sub(r'http\S+', 'Link_spam', text)
    
    # Tách từ tiếng Việt bằng PyVI
    text = ViTokenizer.tokenize(text)
    
    return text

def remove_emojis(text):
    """Remove emojis from text"""
    emoji_count = emoji.emoji_count(text)
    for i in range(emoji_count):
        emoji_char = emoji.emojize(":{}:".format(i+1))
        text = text.replace(emoji_char, "")
    return text



@app.post("/feedback/analyze/")
async def analyze_text(feedback: Feedback):
    text = feedback.contents   
    # Tiền xử lý dữ liệu  
    preprocessed_text = preprocess_text(text)
    
    # Đưa chuỗi vào PhoBERT để xác định sắc thái
    tokenizer = AutoTokenizer.from_pretrained("wonrax/phobert-base-vietnamese-sentiment", use_fast=False)
    model = AutoModelForSequenceClassification.from_pretrained("wonrax/phobert-base-vietnamese-sentiment")
    # input_ids = tokenizer(preprocessed_text, return_tensors="pt", padding=True, truncation=True, max_length=256)
    input_ids = torch.tensor([tokenizer.encode(preprocessed_text)])

    with torch.no_grad():output = model(input_ids)
    print(output.logits.softmax(dim=-1).tolist())

    predictions = output[0].argmax(dim=1)
    labels = ['Negative','Positive', 'Neutral']
    sentiment = labels[predictions[0]]
    # feedback.contents = preprocessed_text
    feedback.sentiment = sentiment
    # feedback.sentiment = sentiment
    insertToDB(feedback)
    print(preprocessed_text)
    print(sentiment)
    # Trả về kết quả dưới dạng JSON
    return {
        "feedback": feedback,
        "predictions": output.logits.softmax(dim=-1).tolist(),
        "preprocessedText" : preprocessed_text
    }

@app.get('/feedback/getAll/')
async def getAllFeedbacks():
     return getFeedbackList()

@app.get('/feedback/get/{categoryId}')
async def getFeedbackByCategory(categoryId:int):
     return getFeedbackListByID(categoryId) 

@app.get('/feedback/get/product/{productId}')
async def getFeedbackByPoductID(productId:int):
     return getFeedbackByProductId(productId) 

@app.get('/feedback/radio')
async def getRadio():
    feedbacks = getFeedbackList()
    return getRatioFb(feedbacks) 

@app.get('/feedback/radio/category/{category}')
async def getRadioByCategory(category:int):
    feedbacks = getFeedbackListByID(category)
    return getRatioFb(feedbacks)

@app.get('/feedback/radio/productID/{productId}')
async def getRadioByProductId(productId:int):
    feedbacks = getFeedbackByProductId(productId)
    return getRatioFb(feedbacks)

@app.get('/star/radio')
async def getRadio():
    feedbacks = getFeedbackList()
    return getRatioStar(feedbacks) 

@app.get('/star/radio/category/{category}')
async def getRadioByCategory(category:int):
    feedbacks = getFeedbackListByID(category)
    return getRatioStar(feedbacks)

@app.get('/star/radio/productID/{productId}')
async def getRadioByProductId(productId:int):
    feedbacks = getFeedbackByProductId(productId)
    return getRatioStar(feedbacks)

def insertToDB(feedback:Feedback):
        # ghi dữ liệu vào bảng
        query = "SELECT fullName FROM [User] WHERE Id = ?"
        cursor.execute(query, (feedback.userId,))
        result = cursor.fetchone()

        # Check if a result was found
        if result is not None:
            full_name = result[0]
        else:
            full_name  = ""                   
        now = datetime.datetime.now()
        cursor.execute('INSERT INTO feedback (contents, star,CreateAt, productId,userId,Sentiment, Username ) VALUES (?, ?, ?, ?, ?, ?, ?)', feedback.contents, feedback.star, now, feedback.productId, feedback.userId, feedback.sentiment, full_name)

        # lưu thay đổi và đóng kết nối
        conn.commit()       

def getFeedbackList():
    #truy vấn dữ liệu từ bảng 
    cursor.execute('SELECT * from feedback')
    
    #lấy dữ liệu từ kết quả truy vấn được
    rows = cursor.fetchall()
    feedbacks = []
    for row in rows:
        feedback = {
            'contents':row[1],
            'star':row[2],
            'productId':row[4],
            'userId':row[5],
            'sentiment':row[7],
            'userName':row[6]
        }

        feedbacks.append(feedback)

    # Trả về mảng đối tượng
    return feedbacks

def getFeedbackListByID(categoryId:int):
    query = "SELECT ID FROM product WHERE Category_ID = ?"
    cursor.execute(query,categoryId)
    rows = cursor.fetchall()
    products = []
    for row in rows:
        products.append(row[0])
    feedbacks = getFeedbackList()
    result = []
    for fb in feedbacks:
        if fb['productId'] in products:
            result.append(fb)
    # Trả về mảng đối tượng
    return result

def getFeedbackByProductId(productId:int):
    query = "SELECT * FROM feedback WHERE ProductId = ?"
    cursor.execute(query,productId)
    rows = cursor.fetchall()
    feedbacks = []
    for row in rows:
        feedback = {
            'star':row[2],
            'contents':row[1],
            'productId':row[4],
            'userId':row[5],
            'sentiment':row[7],
            'userName':row[6]
        }
        feedbacks.append(feedback)

    # Trả về mảng đối tượng
    return feedbacks

def getRatioFb(feedbacks):
    # Count the number of positive and negative feedback
    positive_count = 0
    negative_count = 0
    neutral_count = 0
    for f in feedbacks:
        if f['sentiment'] == 'Positive': 
            positive_count += 1
        elif f['sentiment'] == 'Negative': 
            negative_count += 1
        else: 
            neutral_count += 1

    # Calculate the ratio and return it
    total = positive_count + negative_count + neutral_count
    
    if total != 0: 
        return {
            'positive' : positive_count/total,
            'negative' : negative_count/total,
            'neutral' : neutral_count/total
        } 
    else:
        return {
            'positive' : 0,
            'negative' : 0,
            'neutral' : 0
        }
    
def getNumberOfFb(feedbacks):
    # Count the number of positive and negative feedback
    positive_count = 0
    negative_count = 0
    neutral_count = 0
    for f in feedbacks:
        if f['sentiment'] == 'Positive': 
            positive_count += 1
        elif f['sentiment'] == 'Negative': 
            negative_count += 1
        else: 
            neutral_count += 1

    # Calculate the ratio and return it
    total = positive_count + negative_count + neutral_count
    
    if total != 0: 
        return {
            'positive' : positive_count,
            'negative' : negative_count,
            'neutral' : neutral_count
        } 
    else:
        return {
            'positive' : 0,
            'negative' : 0,
            'neutral' : 0
        }   

def getRatioStar(feedbacks):
    # Count the number of positive and negative feedback
    Zero_count = 0
    One_count = 0
    Two_count = 0
    Three_count = 0
    Four_count = 0
    Five_count = 0
    for f in feedbacks:
        if f['star'] == 0 : 
            Zero_count += 1
        elif f['star'] == 1: 
            One_count += 1
        elif f['star'] == 2: 
            Two_count += 1
        elif f['star'] == 3: 
            Three_count += 1
        elif f['star'] == 4: 
            Four_count += 1
        else: 
            Five_count += 1

    # Calculate the ratio and return it
    total = Zero_count + One_count + Two_count + Three_count + Four_count + Five_count
    
    if total != 0: 
        return {
            'zero' : Zero_count,
            'one' : One_count,
            'two' : Two_count,
            'three' : Three_count,
            'four' : Four_count,
            'five' : Five_count,
        } 
    else:
        return {
             'zero' : 0,
            'one' : 0,
            'two' : 0,
            'three' : 0,
            'four' : 0,
            'five' : 0,
        }

def getListProductFeedback(): 
    query = "SELECT top 1 feedback.userName, feedback.star, feedback.contents, feedback.sentiment, product.name, product.description,ProductImage.Url  FROM feedback JOIN product ON feedback.productID = product.id JOIN ProductImage ON product.id = ProductImage.ProductId"
    cursor.execute(query)
    rows = cursor.fetchall()
    feedbacks = []
    for row in rows:
        feedback = {
            'userName':row[1],
            'star':row[2],
            'contents':row[3],
            'userId':row[4],
            'sentiment':row[5],
            'productName': row[6],
            "description": row[7],
        }
    feedbacks.append(feedback)

    # Trả về mảng đối tượng
    return feedbacks
