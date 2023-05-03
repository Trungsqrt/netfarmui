import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import './Radio.css';
import Feedback from './Feedback';
import ColumnChart from './ColumnChart';
import ReviewTable from './ReviewTable';
import PosImg from '../../../assets/image/pos.png';
import NeuImg from '../../../assets/image/neu.png';
import NegImg from '../../../assets/image/neg.png';

// const datainsert = [
//     {
//         contents: 'Giao hàng nhanh shop tư vấn nhiệt tình , mới sử dụng nên chưa biết như nào',
//         userId: 1011,
//         productId: 2,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'sản phẩm chưa sử dungh nên chưa biết giao hàng nhanh mua 1 chai đc tặng túi phân cà phê vi sinh đóng gói cẩn thận',
//         userId: 1012,
//         productId: 3,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Shop đóng gói cẩn thận .giá cả hợp lí .còn dc tặng thêm quà Phân dùng cho sen đá cây cảnh cực tốt luôn Dùng hết sẽ lại ủng hộ shoppppp ak 😍😍😍😍😍☺️☺️☺️☺️☺️☺️☺️☺️',
//         userId: 1021,
//         productId: 9,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Giao hangd nhanh, tư vấn tận tâm. Sẽ ủng hộ tiếp',
//         userId: 1022,
//         productId: 10,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Trước hết xin cảm ơn shop về phần quà tặng, mình đã thực hiện theo yêu cầu là cho đầy đủ sao nhé. Còn chất lượng thì phải dùng mới biết. Dù sao cũng cảm ơn shop nha',
//         userId: 1011,
//         productId: 11,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Phân bón này rất chất lượng luôn . Tưới hoa sai hẳn',
//         userId: 1012,
//         productId: 12,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Thử bón mấy tuần xem sao Ưng shop dễ thương. Đóng hàng cẩn thận Còn có quà tặng nữa',
//         userId: 1021,
//         productId: 21,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Shop giao hàng nhanh, có cả hướng dẫn rất cụ thể. Cảm ơn shop ạ',
//         userId: 1022,
//         productId: 4,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Shop giao hàng nhanh, đóng gói cẩn thận, tư vấn rất nhiệt tình. Chất lượng thì cần thêm thời gian mới biết được. Tks',
//         userId: 1011,
//         productId: 5,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Sản phẩm tốt mọi người nên mua nhé..............',
//         userId: 1012,
//         productId: 8,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Hàng đúng mô tả,giao hàng nhanh. Shop còn tặng quà nữa. Thank you shop',
//         userId: 1021,
//         productId: 13,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Đóng gói cẩn thận còn được tặng gói đất cà phê. nhưng mình về bón cây ko hiểu sao vàng hết lá',
//         userId: 1022,
//         productId: 14,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Nhìn bề ngoài sản phẩm đúng với quảng cáo Shop có tặng kèm bịch phân dê vi sinh cảm ơn shop',
//         userId: 1011,
//         productId: 15,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Giao hàng nhanh. Mình mua để bón cho hoa ly, hi vọng cây phát triển tốt, ra nhiều hoa Còn được shop tặng thêm bịch phân Cảm ơn shop nhiều nha',
//         userId: 1012,
//         productId: 16,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Hàng giao nhanh, chai đầy ú nu chưa sài bao h nên chưa bt chất kg thế nào, trc mắt thấy shop tận tình có nhắn tin bên zalo để hộ trợ trg quá trình sd khi nào dùng sẽ fb lại',
//         userId: 1021,
//         productId: 20,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Chăm sóc khách rất nhiệt tình, còn đc tặng thêm quà nữa. Cảm ơn shop nhiều. Hình ảnh chỉ mang tính chất nhận xu',
//         userId: 1022,
//         productId: 22,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Mới sử dụng một lần nên chưa rõ chất lượng nhưng săn được giá rẻ mà chai đầy ú nên khá ưng',
//         userId: 1011,
//         productId: 23,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Đóng gói tốt, giá tốt, hàng giống mô tả. Chúc shop buôn may bán đắt.',
//         userId: 1012,
//         productId: 1,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Giao hàng nhanh đặt hôm trước hôm sau đã tới Chất lượng ok với giá tiền Đóng gói sản phẩm chắc chắn Up cho shop',
//         userId: 1021,
//         productId: 6,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Giá rẻ, mua 1 chai này về dùng lâu mới hết. Khâu CSKH rất tốt, shop rep nhanh, lịch sự, chu đáo và chủ động hỏi khách. 5 sao tặng shop',
//         userId: 1022,
//         productId: 7,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Sản phẩm tốt dùng cho người thích trồng cây như mình thực sự hữu ích. Bón lên cây nẩy rất nhiều mầm cây khoẻ nhiều nụ hoa. Mình phản hồi rất tốt khuyên mọi người nên mua nhé.',
//         userId: 1011,
//         productId: 17,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Lần đầu tiên mua hàng của shop nhưng các SP mình mua đều có chất lượng tốt,đúng với mô tả, hàng chuẩn cty nha nên mn cứ yên tâm mua dùng',
//         userId: 1012,
//         productId: 18,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'shop đóng gói cẩn thận, ghi tên loại củ rõ ràng, shop còn tặng thêm quà là phân bón hữu cơ nữa, mình đã mua cây và sản phẩm tại vườn shop nhiều lần, ưng ý',
//         userId: 1021,
//         productId: 19,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Đóng gói cẩn thận, shop thân thiện, hàng đầy đủ như mô tả. Sẽ ủng hộ shop.',
//         userId: 1022,
//         productId: 2,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Chất lượng quá tuyệt vời còn được tặng thêm gói phân hữu cơ bình tưới thì cầm chắc tay phun đều hàng giao nhanh vs cái giá ấy mà mua đc như này là quá được 10 điểm shop có tâm',
//         userId: 1011,
//         productId: 3,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Chất lượng hàng ngoài sự mong đợi (không hiệu quả) mọi người nên cân nhắc khi mua',
//         userId: 1012,
//         productId: 9,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Sản thẩm tốt giá rẻ chất lượng cao 10₫ Nên mua nha mội người👍😁😁😁😁😁',
//         userId: 1021,
//         productId: 10,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Chưa sử dụng nên chưa biết kết quả .mong là sản phẩm tốt',
//         userId: 1022,
//         productId: 11,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Shop rep nhanh mà đóng gói tưởng hộp bảo bối không á, đóng kỹ quá chèn luôn. Cảm ơn shop, baoh cây ra rễ nhiều sẽ mua thêm',
//         userId: 1011,
//         productId: 12,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Có tác dụng nha , mình dùng thử mấy hôm và thấy cây đang lên chồi non, đầu tiên ko biết dùng thế nào nên phải lên gg hỏi mới ra',
//         userId: 1012,
//         productId: 21,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Đã nhận được hàng đầy đủ, giao nhau đóng hộp cẩn thận, nên mua cả nhà ạ',
//         userId: 1021,
//         productId: 4,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'thuốc kích rễ aton cho cây phân bón là kích thích sinh trườngg',
//         userId: 1022,
//         productId: 5,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Sản phẩm chất lượng tuyệt vời, cảm ơn shop đã ship. Sẽ mua ủng hộ nữa nhé',
//         userId: 1011,
//         productId: 8,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Phù hợp giá tiền Giao hàng hơi chậm Đáng để mua Giao đúng sản phẩm đã đặt',
//         userId: 1012,
//         productId: 13,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Giao hàng nhanh Đóng gói chắc chắn Mua 2 lọ còn được tặng phân bón Dùng tốt sẻ tiếp tục ủng hộ',
//         userId: 1021,
//         productId: 14,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Mua lần đầu chưa biết hiệu quả thế nào. Nhưng shop tư vấn rất nhiệt tình nên cho shop 5 sao.',
//         userId: 1022,
//         productId: 15,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Phân bón này tệ quá, cây tôi đã chết sau khi sử dụng. 😞',
//         userId: 1011,
//         productId: 2,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Đã sử dụng phân bón này và không thấy hiệu quả gì cả, tiêu tiền vô ích. 👎',
//         userId: 1012,
//         productId: 3,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Không hài lòng với sản phẩm này, không nên sử dụng cho cây cảnh của bạn. 😔',
//         userId: 1021,
//         productId: 9,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Sản phẩm này gây hại cho cây của tôi và khiến nó chết đi, tôi không thể tin rằng đã mua sản phẩm tệ này. 👎',
//         userId: 1022,
//         productId: 10,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Không nên sử dụng sản phẩm này, nó gây hại cho môi trường và không hiệu quả cho cây. 😕',
//         userId: 1011,
//         productId: 11,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã sử dụng sản phẩm này và không thấy hiệu quả gì, tôi không sẽ mua sản phẩm này lần nữa. 👎',
//         userId: 1012,
//         productId: 12,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Phân bón này đã gây hại cho cây của tôi và khiến nó chết đi. 😞',
//         userId: 1021,
//         productId: 21,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã mua sản phẩm này và thấy nó tệ quá, không nên sử dụng sản phẩm này cho cây của bạn. 😔',
//         userId: 1022,
//         productId: 2,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Sản phẩm này không hiệu quả và gây hại cho cây của tôi, tôi đã lãng phí tiền của mình. 👎',
//         userId: 1011,
//         productId: 3,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Không nên sử dụng sản phẩm này, nó không hiệu quả cho cây của bạn. 😕',
//         userId: 1012,
//         productId: 9,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Sản phẩm này không đáng giá tiền của bạn, tôi không thấy hiệu quả gì từ sản phẩm này. 👎',
//         userId: 1021,
//         productId: 10,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Phân bón này không hiệu quả cho cây của tôi, tôi không khuyến khích sử dụng sản phẩm này. 😕',
//         userId: 1022,
//         productId: 11,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Tôi đã sử dụng sản phẩm này và không thấy hiệu quả gì cả, tôi không khuyến khích sử dụng sản phẩm này. 👎',
//         userId: 1011,
//         productId: 12,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Phân bón này gây hại cho cây của tôi và khiến nó chết đi, tôi không khuyến khích sử dụng sản phẩm này. 😞',
//         userId: 1012,
//         productId: 21,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã mua sản phẩm này và không thấy hiệu quả gì cả, tiếc là tôi đã lãng phí tiền của mình. 👎',
//         userId: 1021,
//         productId: 21,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Giống cây trồng này thật tuyệt vời 🌱💚 Cây mọc khỏe, ra hoa đẹp và cho trái ngọt ngào',
//         userId: 1012,
//         productId: 4,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi thích giống hạt giống này 🌻💛 Nó cho ra hoa lớn và đẹp, rất thích hợp để trang trí sân vườn',
//         userId: 1021,
//         productId: 5,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Hạt giống này rất dễ trồng 🌱💪 Tôi không phải là một người có tay nghề trồng trọt nhưng tôi vẫn thu được nhiều trái ngon',
//         userId: 1022,
//         productId: 8,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Tôi đã trồng giống này trong vườn của mình và chúng mọc rất tốt 🌱👍 Nó cho trái ngọt và giòn, tôi rất thích ăn',
//         userId: 1011,
//         productId: 13,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Giống cây trồng này rất dễ chăm sóc 🌱💚 Tôi không cần phải dành quá nhiều thời gian để chăm sóc nó nhưng nó vẫn cho ra hoa và trái đẹp',
//         userId: 1012,
//         productId: 14,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Tôi đã mua giống hạt giống này và nó cho ra rất nhiều trái 🍓💯 Chúng rất ngon và thơm, tôi sẽ tiếp tục mua trong tương lai',
//         userId: 1021,
//         productId: 15,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Tôi trồng giống này đã lâu và vẫn rất hài lòng 🌱💖 Nó cho ra hoa đẹp và trái ngon, tôi chắc chắn sẽ mua lại trong tương lai',
//         userId: 1022,
//         productId: 16,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Giống cây trồng này thật sự tuyệt vời 🌱💚 Nó cho trái ngọt và giòn, màu sắc đẹp mắt và rất dễ chăm sóc',
//         userId: 1011,
//         productId: 4,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Tôi đã mua giống hạt giống này và nó cho ra rất nhiều hoa 🌺💯 Chúng rất đẹp và thơm, tôi rất hài lòng với kết quả',
//         userId: 1012,
//         productId: 5,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Giống cây trồng này rất thích hợp để trồng trong vườn 🌱👍 Tôi đã trồng chúng và chúng mọc khỏe và đẹp',
//         userId: 1021,
//         productId: 8,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Hạt giống này rất dễ chăm sóc 🌱💪 Tôi chỉ cần tưới nước và thỉnh thoảng bón phân là nó sẽ cho ra hoa và trái rất đẹp',
//         userId: 1022,
//         productId: 13,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã trồng giống này và chúng tôi đã có một vườn rau tuyệt vời 🌱🌿🥦🥕🍅',
//         userId: 1011,
//         productId: 14,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Giống cây này thật tuyệt vời, nó mọc rất nhanh và cho năng suất cao 🌱🍅🌽🌶️🍆',
//         userId: 1012,
//         productId: 15,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã trồng giống này trong vườn của tôi và nó cho tôi rất nhiều hoa tuyệt đẹp 🌼🌻🌷💐🌸',
//         userId: 1021,
//         productId: 16,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Hạt giống này thật tuyệt vời, nó cho ra cây rất đẹp và lá xanh rất tươi 🌿🌱🌳🌴🌲',
//         userId: 1022,
//         productId: 20,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã trồng giống này và nó đã cho tôi rất nhiều trái ngon, tôi rất hài lòng 🍎🍊🍓🍇🍉',
//         userId: 1011,
//         productId: 22,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã mua hạt giống này và chúng đã nảy mầm rất nhanh, tôi rất vui mừng về điều đó 🌱🌿🌳🌴🌲',
//         userId: 1012,
//         productId: 23,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Giống cây này thật tuyệt vời, nó chịu được nắng nóng và mưa gió, mình thích nó lắm 🌿🌱🌳🌴🌲',
//         userId: 1021,
//         productId: 20,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã trồng giống này và nó cho tôi rất nhiều quả ngon và khỏe mạnh 🍅🍓🍇🍉🥑',
//         userId: 1022,
//         productId: 22,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Tôi đã mua hạt giống này và nó đã nảy mầm rất nhanh, tôi tin rằng nó sẽ cho tôi nhiều hoa và trái ngon 🌱🌿🌻🌼🌸',
//         userId: 1011,
//         productId: 23,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Giống cây này rất tuyệt vời, chúng tôi đã trồng nó trong vườn và nó cho ra nhiều hoa và trái ngon 🌿🌱🌳🌴🌲🌼',
//         userId: 1012,
//         productId: 20,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Tôi đã trồng giống này trong chậu và nó cho tôi rất nhiều hoa tuyệt đẹp, tôi rất hài lòng 🌸🌼💐🌻🌷',
//         userId: 1021,
//         productId: 22,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Hạt giống này rất tuyệt vời, chúng tôi đã trồng nó trong vườn và nó cho ra rất nhiều quả ngon 🍎',
//         userId: 1022,
//         productId: 23,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Giống cây trồng này rất dễ trồng 🌱👍. Tôi đã trồng chúng trong vườn của mình và chúng phát triển rất tốt.',
//         userId: 1021,
//         productId: 20,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Mình rất thích giống cây trồng này 🌿💚. Chúng rất cứng cáp và đẹp mắt. Chắc chắn sẽ trồng chúng lại.',
//         userId: 1022,
//         productId: 22,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Giống cây trồng này rất thích hợp với khí hậu ở đây 🌞🌡️. Tôi đã trồng chúng trong vườn của mình và chúng phát triển rất tốt.',
//         userId: 1011,
//         productId: 23,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Mình đã mua hạt giống này và rất hài lòng về chất lượng 🌱👍. Cây trồng đã nảy mầm nhanh chóng và phát triển rất tốt.',
//         userId: 1012,
//         productId: 20,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Giống cây trồng này rất thích hợp với khí hậu ở đây, chúng phát triển rất nhanh 🌿🌞. Tôi rất hài lòng với kết quả.',
//         userId: 1021,
//         productId: 22,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Mình đã trồng giống cây trồng này trong vườn của mình và chúng rất dễ chăm sóc 🌱😊. Chúng tạo nên một vẻ đẹp tuyệt vời cho vườn nhà tôi.',
//         userId: 1022,
//         productId: 23,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Giống cây trồng này có vị ngọt rất đặc biệt 🍓🍇. Mình đã trồng chúng trong vườn và rất hài lòng với kết quả.',
//         userId: 1011,
//         productId: 20,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Mình rất thích giống cây trồng này, chúng rất dễ trồng và phát triển nhanh 🌱💚. Tôi đã trồng chúng trong vườn và chúng đem lại một vẻ đẹp độc đáo.',
//         userId: 1012,
//         productId: 22,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Giống cây trồng này phát triển rất tốt trong đất ẩm 💦🌿. Tôi đã trồng chúng trong vườn và chúng đang phát triển rất mạnh mẽ.',
//         userId: 1021,
//         productId: 23,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Mình rất hài lòng với giống cây trồng này, chúng phát triển rất tốt và rất dễ chăm sóc 🌱😍. Tôi đã trồng chúng trong vườn và chúng đem lại một vẻ đẹp tuyệt vời.',
//         userId: 1022,
//         productId: 20,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Giống cây trồng này rất thích hợp với khí hậu ở đây 🌞🌡️. Chúng phát triển rất nhanh và đem lại một vẻ đẹp độc đáo cho vườn của tôi 🌿💚.',
//         userId: 1011,
//         productId: 22,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Cây giống này đắt quá, tôi mua mà không thấy hiệu quả gì 🙁💰',
//         userId: 1022,
//         productId: 4,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Hạt giống này chất lượng thấp, không nảy mầm được 😞🌱',
//         userId: 1011,
//         productId: 5,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Cây giống này bị bệnh nặng, tôi phải đốt hết đi 😔🔥',
//         userId: 1012,
//         productId: 8,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Hạt giống này không đáng giá với giá tiền, tôi đã phải mua lại từ chỗ khác 🤔💸',
//         userId: 1021,
//         productId: 13,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã trồng loại cây giống này nhưng chúng chết mất rồi 😞🍂',
//         userId: 1022,
//         productId: 14,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Hạt giống này thực sự tệ, tôi không thể trồng được một cây nào 🙁🌱',
//         userId: 1011,
//         productId: 15,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Cây giống này đã bị chết khi tôi nhận được, rất thất vọng 😔💀',
//         userId: 1012,
//         productId: 16,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Hạt giống này không đúng loại như tôi đã đặt mua, tôi cảm thấy rất bực mình 🤬❌',
//         userId: 1021,
//         productId: 4,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã trồng cây giống này nhưng chúng không đủ sức sống để phát triển 😔🍂',
//         userId: 1022,
//         productId: 5,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Hạt giống này bị nhiễm sâu bệnh quá nặng, không thể cứu vãn được 🙁🐛',
//         userId: 1011,
//         productId: 8,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã mua hạt giống này nhưng chúng không nảy mầm được, rất thất vọng 😞🌱',
//         userId: 1012,
//         productId: 13,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Cây giống này không đúng như mô tả, tôi phải tìm mua loại khác 😕❌',
//         userId: 1021,
//         productId: 14,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã trồng cây giống này nhưng chúng không ra quả được, tôi rất thất vọng 😞🍎',
//         userId: 1022,
//         productId: 15,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Hạt giống này rất tệ, không thể nảy mầm được, tôi không muốn mua lại nữa 🙁🌱',
//         userId: 1011,
//         productId: 16,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Cây giống này không phát triển được, tôi phải tìm mua loại khác 😕🌱',
//         userId: 1012,
//         productId: 4,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã trồng loại cây giống này nhưng chúng bị chết sau vài ngày 😞💀',
//         userId: 1021,
//         productId: 5,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Hạt giống này không đáng tiền, tôi không muốn mua lại nữa 🤔💸',
//         userId: 1022,
//         productId: 8,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Cây giống này bị nhiễm bệnh quá nặng, tôi phải tiêu diệt nó để không làm tổn hại đến các cây khác 😔🦠',
//         userId: 1011,
//         productId: 13,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Mua giống cây này nhưng không thấy nảy mầm. 😔🌱',
//         userId: 1011,
//         productId: 20,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Cây giống này chết hết rồi, không hiểu tại sao. 😡🌿',
//         userId: 1012,
//         productId: 22,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Giống cây này quá dễ chết, tôi đã mua vài lần và chưa thành công lần nào. 😤🌳',
//         userId: 1021,
//         productId: 23,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Hoa trên giống cây này rất đẹp nhưng chất lượng cây thì tệ hơn tưởng tượng. 😞🌸',
//         userId: 1022,
//         productId: 20,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Sai giống cây rồi, không phù hợp với khí hậu ở đây. 😩🌺',
//         userId: 1011,
//         productId: 22,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Cây giống này bị nhiễm bệnh liên tục, không thể trồng được một mùa nào. 😫🌿',
//         userId: 1012,
//         productId: 23,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Giống cây này thật sự không đáng giá giá tiền, tôi không khuyến khích ai mua. 😒🌳',
//         userId: 1021,
//         productId: 20,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Đã mua giống cây này, nhưng chất lượng lại không đúng như mô tả trên trang web. 😕🌱',
//         userId: 1022,
//         productId: 22,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Cây giống này quá khó trồng, tôi đã thử nhiều lần nhưng vẫn thất bại. 😖🌺',
//         userId: 1011,
//         productId: 23,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Tôi không hiểu sao giống cây này lại được đánh giá cao như vậy, tôi đã trồng nhưng không ra hoa. 😠🌸',
//         userId: 1012,
//         productId: 20,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Giống cây này có giá rất đắt nhưng chất lượng lại rất tệ. 😞🌳',
//         userId: 1021,
//         productId: 22,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Mình đã trồng giống cây này nhưng chỉ sau vài tháng thì cây chết hết. 😡🌿',
//         userId: 1022,
//         productId: 23,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Cây giống này không phù hợp với khí hậu ở đây, mình phải đầu tư nhiều nhưng vẫn thất bại. 😩🌴',
//         userId: 1011,
//         productId: 20,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Giống cây này có vẻ đẹp nhưng không chịu được môi trường khắc nghiệt ở nước mình. 😔🌱',
//         userId: 1012,
//         productId: 22,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Đã mua giống cây này, nhưng khi trồng lại bị nhiễm bệnh và chết hết. 😫🌺',
//         userId: 1021,
//         productId: 23,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Mua giống cây này trên trang web nhưng khi nhận hàng đã thấy khác hoàn toàn. 😒🌿',
//         userId: 1022,
//         productId: 4,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Mình đã mua giống cây này nhưng chỉ sau vài tháng thì nó không còn sống nữa. 😖🌸',
//         userId: 1011,
//         productId: 5,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Tôi mua hạt giống của loại cây này nhưng chỉ có vài cái nảy mầm, phần lớn đều không nảy. 😞🌱',
//         userId: 1012,
//         productId: 8,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Sản phẩm quảng cáo nhưng khi trồng thì rất khó để nảy mầm. Không nên mua. 😕🚫',
//         userId: 1021,
//         productId: 13,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Đã thử trồng loại cây này mà không được như mong đợi. Mất tiền vô ích. 😔💰',
//         userId: 1022,
//         productId: 14,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Cây giống này rất dễ chết, mất nhiều công sức để chăm sóc mà vẫn không thể sống được. 🤦♀️💀',
//         userId: 1011,
//         productId: 15,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Hạt giống của loại cây này đã bị hỏng khi vận chuyển đến, không thể trồng được. 😞🚚',
//         userId: 1012,
//         productId: 16,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Sản phẩm rẻ tiền nhưng lại không đạt chất lượng mong muốn. Hạt giống rất khó để nảy mầm. 😕💰',
//         userId: 1021,
//         productId: 4,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Đã trồng loại cây này nhưng không hiểu sao lại bị chết một cách bí ẩn. Không đáng để mua. 🤷♀️💀',
//         userId: 1022,
//         productId: 5,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Tôi đã mua hạt giống này và trồng nhiều lần nhưng chưa bao giờ thành công. 🤦♂️🌱',
//         userId: 1011,
//         productId: 8,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Hạt giống nhỏ và không đều, nhiều cái đã hỏng trước khi trồng được. Không tốt. 😔👎',
//         userId: 1012,
//         productId: 13,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Loại cây này không phù hợp với điều kiện khí hậu ở khu vực của tôi. Tôi đã thất bại khi trồng. 😞🌡️',
//         userId: 1021,
//         productId: 14,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Hạt giống này rất khó để mua, tôi phải tìm ở nhiều cửa hàng nhưng vẫn không đạt kết quả như mong đợi. 😕🔍',
//         userId: 1022,
//         productId: 15,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Loại cây này yêu cầu nhiều sự chăm sóc và chất liệu đất đai đặc biệt. Không dành cho người mới bắt đầu. 🤷♂️💪',
//         userId: 1011,
//         productId: 16,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã trồng loại cây này nhưng không thể đạt được một mùa vụ thành công. 😔👎',
//         userId: 1012,
//         productId: 20,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Hạt giống này không có chất lượng, chỉ đơn giản là hoàn toàn bất thường. Không nên mua. 🚫🌱',
//         userId: 1021,
//         productId: 23,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Tôi đã trồng giống cây này và nó cho một lượng trái ngọt ngào. 🌳🍎',
//         userId: 1012,
//         productId: 4,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Giống cây này có vẻ khỏe mạnh, nhưng tôi chưa thấy nó cho trái. 🌱🤔',
//         userId: 1021,
//         productId: 5,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi đã thử trồng loại này trong năm ngoái và nó phát triển khá tốt, tuy nhiên không cho nhiều trái. 🌿👍',
//         userId: 1022,
//         productId: 8,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Giống cây này dễ trồng và chịu được điều kiện thời tiết khắc nghiệt. 🌳🌞',
//         userId: 1011,
//         productId: 13,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Tôi không rõ vì sao, nhưng loại cây này không phát triển được trong khu vườn của tôi. 🌿😞',
//         userId: 1012,
//         productId: 14,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Giống cây này tôi đã trồng nhiều lần và luôn cho năng suất tốt. 🌱👍',
//         userId: 1021,
//         productId: 15,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Cây này khá dễ trồng, nhưng nó không chịu được thời tiết lạnh. 🌳❄️',
//         userId: 1022,
//         productId: 16,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Loại cây này có năng suất tốt, nhưng tôi phải sử dụng nhiều thuốc trừ sâu để giữ nó khỏe mạnh. 🌿👎',
//         userId: 1011,
//         productId: 4,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Tôi đã trồng giống cây này trong khu vườn nhỏ của tôi và nó cho trái rất ngon. 🌳🍓',
//         userId: 1012,
//         productId: 5,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Giống cây này tôi đã trồng từ năm ngoái và nó cho trái khá đều đặn. 🌱👍',
//         userId: 1021,
//         productId: 8,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi không chắc liệu giống cây này có phù hợp với khu vực của tôi hay không. 🌿🤔',
//         userId: 1022,
//         productId: 13,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Loại cây này cho trái tốt, nhưng tôi phải tốn nhiều thời gian để chăm sóc nó. 🌳⏰',
//         userId: 1011,
//         productId: 14,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã thử trồng loại này một lần và thấy nó khá khó trồng. 🌱😞',
//         userId: 1012,
//         productId: 15,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Giống cây này chịu được điều kiện thời tiết khắc nghiệt và phát triển khá nhanh. 🌿🌞',
//         userId: 1021,
//         productId: 16,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã trồng giống cây này trong khu vườn của tôi và thấy nó phát triển rất tốt. 🌳👍',
//         userId: 1022,
//         productId: 20,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Loại cây này tôi chưa bao giờ trồng, nhưng nghe nói rất khó trồng. 🌱😞',
//         userId: 1011,
//         productId: 22,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Thức ăn chăn nuôi này thật tuyệt vời, tôi đã thử nhiều loại nhưng chưa từng thấy tốt đến vậy! 😍👍',
//         userId: 1012,
//         productId: 1,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi rất hài lòng với chất lượng của thức ăn chăn nuôi này, chúng tôi đã sử dụng nó trong một thời gian dài và thấy rất hiệu quả. 👌🐷',
//         userId: 1021,
//         productId: 6,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Thức ăn này là sự lựa chọn tốt nhất cho chúng tôi, không chỉ là giá cả phải chăng mà còn có chất lượng tuyệt vời. 😊👍',
//         userId: 1022,
//         productId: 7,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Chúng tôi đã sử dụng thức ăn này trong thời gian dài và tất cả đều rất khỏe mạnh, chất lượng thực sự tuyệt vời. 😍🐄',
//         userId: 1011,
//         productId: 17,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi không thể tin được giá cả của sản phẩm tuyệt vời này, chúng tôi đã giảm chi phí nhưng vẫn đảm bảo chất lượng cho đàn gia súc của mình. 🤑👍',
//         userId: 1012,
//         productId: 18,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi đã chuyển sang sử dụng thức ăn chăn nuôi này và không hối tiếc về quyết định của mình. Chất lượng thực sự tốt và giá cả phải chăng. 😊👌',
//         userId: 1021,
//         productId: 19,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi rất ấn tượng với thức ăn chăn nuôi này, đàn gia súc của tôi rất thích nó và tôi thấy chúng khỏe mạnh hơn rất nhiều. 😍🐖',
//         userId: 1022,
//         productId: 1,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi rất hài lòng với sản phẩm này, đội ngũ hỗ trợ của nhà cung cấp cũng rất tốt. Tôi sẽ tiếp tục sử dụng sản phẩm này trong tương lai. 😊👍',
//         userId: 1011,
//         productId: 6,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Thức ăn chăn nuôi này rất đáng giá tiền, tôi đã sử dụng nó trong một thời gian dài và đội ngũ hỗ trợ của nhà cung cấp cũng rất tốt. 👌🐄',
//         userId: 1012,
//         productId: 7,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Chúng tôi đã chuyển sang sử dụng sản phẩm này và không hối tiếc về quyết định của mình, đàn gia súc của chúng tôi thấy rất khỏe mạnh. 😍👍',
//         userId: 1021,
//         productId: 17,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Thức ăn này rất tốt cho chăn nuôi của tôi! 🐄🐖🐔👍',
//         userId: 1022,
//         productId: 18,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Được làm từ nguyên liệu tự nhiên và không chứa chất bảo quản, tôi hoàn toàn tin tưởng vào sản phẩm này. 🌿👌',
//         userId: 1011,
//         productId: 19,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Mùi vị của thức ăn này thật sự hấp dẫn, chăn nuôi của tôi ăn no và khoẻ mạnh hơn. 🍽️😋',
//         userId: 1012,
//         productId: 1,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi đã dùng sản phẩm này trong một thời gian dài và thấy sự khác biệt rõ rệt trong sức khỏe của đàn vật nuôi của mình. 🐄👍',
//         userId: 1021,
//         productId: 6,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Sản phẩm này giúp tăng cường sức đề kháng cho chăn nuôi của tôi, họ không còn mắc bệnh nhiều như trước nữa. 💪🐖🐔',
//         userId: 1022,
//         productId: 7,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Giá thành của sản phẩm này rất hợp lý so với các sản phẩm cùng loại trên thị trường. 💰👍',
//         userId: 1011,
//         productId: 17,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Sản phẩm này chứa nhiều chất dinh dưỡng, giúp chăn nuôi của tôi phát triển tốt hơn. 🌿👌🐄🐖🐔',
//         userId: 1012,
//         productId: 18,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Thức ăn này giúp tăng cường sức đề kháng của đàn vật nuôi và giảm thiểu tình trạng bệnh tật. 💪👌🏥',
//         userId: 1021,
//         productId: 19,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi hoàn toàn hài lòng với sản phẩm này, chăn nuôi của tôi trông khỏe mạnh và đầy sức sống hơn. 🐄🐖🐔💯',
//         userId: 1022,
//         productId: 1,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Sản phẩm này rất tiện lợi và dễ sử dụng, tôi sẽ tiếp tục sử dụng trong tương lai. 👍👌',
//         userId: 1011,
//         productId: 6,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Thức ăn này được làm từ những nguyên liệu chất lượng cao, tôi hoàn toàn an tâm khi cho đàn vật nuôi ăn. 🌿🐄🐖🐔',
//         userId: 1012,
//         productId: 7,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Sản phẩm này thực sự đáng giá tiền, chất lượng tốt và giá cả hợp lý. 💰💯',
//         userId: 1021,
//         productId: 17,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Đây là sản phẩm tốt nhất mà tôi từng dùng cho chăn nuôi của mình, tôi rất hài lòng. 👍🐄🐖🐔',
//         userId: 1022,
//         productId: 18,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Tôi đã dùng thức ăn này cho đàn gia cầm của mình và chúng ăn rất ngon. 🐔🍴',
//         userId: 1011,
//         productId: 19,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Thức ăn này rất đáng tin cậy và giúp cho lợn của tôi phát triển tốt hơn. 🐖👍',
//         userId: 1012,
//         productId: 1,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi đã thử nhiều loại thức ăn khác nhau cho chó của tôi nhưng chỉ có loại này mới thật sự đáng để đầu tư. 🐶💰',
//         userId: 1021,
//         productId: 6,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Thức ăn này giúp cho bò của tôi tăng cân một cách nhanh chóng và khỏe mạnh hơn. 🐄💪',
//         userId: 1022,
//         productId: 7,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Đàn heo của tôi rất thích ăn loại thức ăn này, chúng ăn hết sạch mỗi lần được cho ăn. 🐷😋',
//         userId: 1011,
//         productId: 17,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi đã dùng thức ăn này cho đàn gà của mình trong một thời gian dài và tôi rất hài lòng về chất lượng của sản phẩm này. 🐔👌',
//         userId: 1012,
//         productId: 18,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Thức ăn này rất giàu dinh dưỡng và giúp cho các con vật của tôi phát triển rất tốt. 🌟🐖🐄',
//         userId: 1021,
//         productId: 19,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi đã dùng loại thức ăn này cho đàn bò của mình và kết quả là chúng trở nên khỏe mạnh hơn và có sức đề kháng tốt hơn. 🐄💪👍',
//         userId: 1022,
//         productId: 1,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Thức ăn này giúp cho đàn heo của tôi tăng trưởng nhanh chóng hơn so với các loại thức ăn khác. 🐷💨',
//         userId: 1011,
//         productId: 6,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi rất tin tưởng vào chất lượng của loại thức ăn này và đã sử dụng nó cho đàn gia cầm của mình trong nhiều năm qua. 🐓💯',
//         userId: 1012,
//         productId: 7,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Thức ăn này giúp cho chó của tôi có một vóc dáng khỏe mạnh và tràn đầy năng lượng. 🐶💪🌟',
//         userId: 1021,
//         productId: 17,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Tôi đã dùng thức ăn này cho đàn lợn của mình trong một thời gian dài và kết quả là chúng phát triển rất tốt. 🐖💪',
//         userId: 1022,
//         productId: 18,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Thức ăn này rất giàu dinh dưỡng và giúp cho đàn bò của tôi phát triển một cách khỏe mạnh. 🐄💪👌',
//         userId: 1011,
//         productId: 19,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Tôi đã sử dụng sản phẩm này cho gia súc của mình và kết quả thực sự tuyệt vời! 🐄💪👍',
//         userId: 1012,
//         productId: 1,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Thức ăn này giúp tăng cường sức khỏe và tăng trưởng của đàn gia cầm của tôi. Tôi rất hài lòng với kết quả. 🐔👌💚',
//         userId: 1021,
//         productId: 6,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Sản phẩm này giúp tăng cường sức đề kháng và kháng bệnh cho đàn lợn của tôi. Tôi đánh giá cao chất lượng của sản phẩm này. 🐖💪👏',
//         userId: 1022,
//         productId: 7,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Đàn cá của tôi trông khỏe mạnh hơn sau khi sử dụng thức ăn này. Tôi đã sử dụng sản phẩm này trong một thời gian dài và rất hài lòng với hiệu quả. 🐟💯🙌',
//         userId: 1011,
//         productId: 17,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi đã chuyển sang sử dụng thức ăn này cho đàn gia súc của mình và đã thấy sự khác biệt rõ rệt trong sức khỏe và tăng trưởng của chúng. 🐄👍💪',
//         userId: 1012,
//         productId: 18,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi rất thích sản phẩm này! Nó giúp gia tăng sản lượng sữa của bò của tôi mà không làm giảm chất lượng. 🥛🐄💚',
//         userId: 1021,
//         productId: 19,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Đàn gà của tôi trông khỏe mạnh và sáng lập hơn sau khi sử dụng sản phẩm này. Tôi rất hài lòng với kết quả. 🐔💯👌',
//         userId: 1022,
//         productId: 1,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Sản phẩm này đã giúp tăng cường sức khỏe và sự phát triển của đàn heo của tôi. Tôi tin tưởng vào chất lượng của sản phẩm này. 🐖💪👏',
//         userId: 1011,
//         productId: 6,
//         star: 5,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi đã dùng sản phẩm này cho đàn cá của mình và đã thấy chúng khỏe mạnh hơn và ít bị bệnh hơn. Tôi rất hài lòng với kết quả. 🐟💚👍',
//         userId: 1012,
//         productId: 7,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Thức ăn này rất hiệu quả! Tôi đã thấy sự tăng trưởng và sức khỏe của đàn gia cầm của tôi được cải thiện rõ rệt sau khi sử dụng sản phẩm này. 🐔💯💪',
//         userId: 1021,
//         productId: 17,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Tôi sử dụng sản phẩm này cho gia súc của mình và đã thấy sự khác biệt rõ rệt trong sức khỏe và tăng trưởng của chúng. 🐄👌👏',
//         userId: 1022,
//         productId: 18,
//         star: 4,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Thức ăn chăn nuôi này tạm được nhưng không có gì đặc biệt 🤷♀️',
//         userId: 1021,
//         productId: 1,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Cái gì cũng tốt, không có gì để phàn nàn về thức ăn chăn nuôi này 😐',
//         userId: 1022,
//         productId: 6,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Thức ăn chăn nuôi này ổn đấy, tôi đã dùng nó trong một thời gian dài và không có vấn đề gì 🤔',
//         userId: 1011,
//         productId: 7,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Tôi mong muốn họ cung cấp nhiều loại thức ăn chăn nuôi hơn để lựa chọn 🙄',
//         userId: 1012,
//         productId: 17,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Thức ăn chăn nuôi này có vị hơi kì lạ nhưng chó của tôi vẫn ăn ngon lành 😋',
//         userId: 1021,
//         productId: 18,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Không có gì đáng chú ý về thức ăn chăn nuôi này, nhưng giá cả hơi cao so với những thương hiệu khác 🤑',
//         userId: 1022,
//         productId: 19,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Thức ăn chăn nuôi này đáp ứng nhu cầu dinh dưỡng của thú cưng tôi, tôi rất hài lòng 🤗',
//         userId: 1011,
//         productId: 1,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi cảm thấy thức ăn chăn nuôi này không thật sự tốt, thú cưng của tôi không ăn nó một cách thoải mái 😞',
//         userId: 1012,
//         productId: 6,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Một loại thức ăn chăn nuôi đáng tin cậy, giá cả phù hợp với chất lượng 🤝',
//         userId: 1021,
//         productId: 7,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Tôi đã đổi sang thức ăn chăn nuôi khác sau khi sử dụng loại này trong một thời gian dài, không hài lòng với chất lượng 🙁',
//         userId: 1022,
//         productId: 17,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Thức ăn chăn nuôi này không gây dị ứng cho thú cưng của tôi, điều này rất quan trọng với tôi 🙌',
//         userId: 1011,
//         productId: 18,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Tôi mong muốn họ cung cấp thêm thông tin về thành phần của sản phẩm để tôi có thể đưa ra quyết định chính xác hơn 🤔',
//         userId: 1012,
//         productId: 19,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Thức ăn chăn nuôi này tuy không đắt nhưng chất lượng cũng tạm ổn 🤨',
//         userId: 1021,
//         productId: 1,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Tôi không chắc chắn rằng thức ăn chăn nuôi này đáp ứng đầy đủ nhu cầu dinh dưỡng của thú cưng của tôi 🤔',
//         userId: 1022,
//         productId: 6,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Thức ăn này không tốt lắm, nhưng cũng không quá tồi 🤷♀️',
//         userId: 1011,
//         productId: 7,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Mình thấy sản phẩm này khá ổn, chúng tôi đã sử dụng trong thời gian dài 🐖👍',
//         userId: 1012,
//         productId: 17,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Sản phẩm tạm được, không quá nổi bật nhưng cũng không tệ 🐓👌',
//         userId: 1021,
//         productId: 18,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Chất lượng sản phẩm ổn định, chúng tôi sử dụng hàng ngày cho vật nuôi của mình 🐄👍',
//         userId: 1022,
//         productId: 19,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Không có gì đặc biệt, sản phẩm này giống như bao sản phẩm khác trên thị trường 🤔',
//         userId: 1011,
//         productId: 1,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Thức ăn này dễ tìm và giá cả hợp lý, chúng tôi thường sử dụng cho vật nuôi của mình 🐷💰',
//         userId: 1012,
//         productId: 6,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Sản phẩm này đáp ứng yêu cầu cơ bản của chúng tôi, không có gì đáng phàn nàn 🐔👌',
//         userId: 1021,
//         productId: 7,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Tạm được, sản phẩm này không thể so sánh với những sản phẩm cao cấp hơn 🤷♂️',
//         userId: 1022,
//         productId: 17,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Không có gì đặc biệt về sản phẩm này, nhưng chất lượng cũng không quá tệ 👍',
//         userId: 1011,
//         productId: 18,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Chúng tôi đã sử dụng sản phẩm này trong thời gian dài và thấy rất ổn định 🐖👍',
//         userId: 1012,
//         productId: 19,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Sản phẩm này chưa được cải tiến nhiều, nhưng đáp ứng nhu cầu cơ bản của vật nuôi 🐄👌',
//         userId: 1021,
//         productId: 1,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tạm được, sản phẩm này không gây ra vấn đề gì đáng lo ngại 🤔',
//         userId: 1022,
//         productId: 6,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Chúng tôi đã thử nhiều sản phẩm và thấy sản phẩm này khá tốt 🐔👍',
//         userId: 1011,
//         productId: 7,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Sản phẩm này không có gì đặc biệt, nhưng cũng không tệ 🤷♀️',
//         userId: 1012,
//         productId: 17,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Chúng tôi thấy sản phẩm này khá tốt và sử dụng hàng ngày cho vật nuôi của mình 🐷👍',
//         userId: 1021,
//         productId: 18,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Sản phẩm này đáp ứng nhu cầu của vật nuôi, không có gì đáng phàn nàn 🐄👌',
//         userId: 1022,
//         productId: 19,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Chất lượng sản phẩm tạm ổn, nhưng giá cả hơi cao so với các sản phẩm tương tự trên thị trường 🤔💰',
//         userId: 1011,
//         productId: 1,
//         star: 3,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Thức ăn này quá đắt và không hiệu quả, tôi không bao giờ sử dụng nó lại 😒👎',
//         userId: 1012,
//         productId: 19,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Chất lượng của sản phẩm này thật tệ, thú nuôi của tôi không thể ăn được nó 🤢👎',
//         userId: 1021,
//         productId: 1,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Đã sử dụng thức ăn này trong một thời gian dài nhưng không có hiệu quả gì cả, tôi thật sự thất vọng 😔👎',
//         userId: 1022,
//         productId: 6,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Sản phẩm này không phù hợp với loài thú nuôi của tôi và gây ra nhiều vấn đề về sức khỏe 🤕👎',
//         userId: 1011,
//         productId: 7,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Thức ăn này quá khó nuốt và không có hương vị tốt, thú nuôi của tôi đã từ chối ăn nó 😒👎',
//         userId: 1012,
//         productId: 17,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Tôi đã mua sản phẩm này vì giá rẻ nhưng nó không đáng tiền, không có giá trị dinh dưỡng 🤢👎',
//         userId: 1021,
//         productId: 18,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Thức ăn này gây ra tình trạng tiêu chảy cho thú nuôi của tôi, tôi sẽ không bao giờ sử dụng nó nữa 🤢👎',
//         userId: 1022,
//         productId: 19,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Chất lượng sản phẩm không đảm bảo, mùi hôi của nó cũng gây khó chịu cho tôi 😷👎',
//         userId: 1011,
//         productId: 1,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             ' Sản phẩm này không giúp tăng cường sức khỏe của thú nuôi của tôi, tôi đã phải tìm một sản phẩm khác 🤕👎',
//         userId: 1012,
//         productId: 6,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Đó là một thất bại hoàn toàn, thức ăn này không thể được tiêu thụ bởi loài thú nuôi của tôi 😔👎',
//         userId: 1021,
//         productId: 7,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Sản phẩm này không phù hợp với loài thú nuôi của tôi, chúng tôi đã phải tìm một sản phẩm khác 😔👎',
//         userId: 1022,
//         productId: 17,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi không thể tin được tôi đã mất tiền cho sản phẩm này, không có hiệu quả gì cả 🤦♀️👎',
//         userId: 1011,
//         productId: 18,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents:
//             'Thức ăn này quá khó chịu, thú nuôi của tôi đã từ chối ăn nó và tôi đã phải tìm một sản phẩm khác 🙄👎',
//         userId: 1012,
//         productId: 19,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Sản phẩm này không đáng tin cậy và không giúp cải thiện sức khỏe của thú nuôi của tôi 😞👎',
//         userId: 1021,
//         productId: 1,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Thức ăn này quá đắt và chất lượng kém 🙁💰',
//         userId: 1022,
//         productId: 6,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Tôi đã mua sản phẩm này và nó đã gây ra vấn đề với thú cưng của tôi 🙁🐶',
//         userId: 1011,
//         productId: 7,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Không hài lòng với thức ăn, thú cưng của tôi đã từ chối ăn 🙁🐱',
//         userId: 1012,
//         productId: 17,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Đã sử dụng sản phẩm này nhưng thấy hiệu quả không đáng kể 🙁💔',
//         userId: 1021,
//         productId: 18,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Sản phẩm này không phù hợp với loại thú cưng của tôi, gây ra vấn đề về sức khỏe 🙁🐹',
//         userId: 1022,
//         productId: 19,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Thức ăn này có mùi hôi và thú cưng của tôi không thích 🙁🤢',
//         userId: 1011,
//         productId: 1,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Tôi đã cố gắng chuyển đổi sang sản phẩm này nhưng thú cưng của tôi không ăn 🙁🙅♂️',
//         userId: 1012,
//         productId: 6,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Sản phẩm này gây ra dị ứng cho thú cưng của tôi 🙁🤧',
//         userId: 1021,
//         productId: 7,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Chất lượng sản phẩm không tốt và thú cưng của tôi từ chối ăn 🙁🤮',
//         userId: 1022,
//         productId: 17,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: ' Tôi đã mua sản phẩm này một lần và không sẽ không mua lần nữa 🙁👎',
//         userId: 1011,
//         productId: 18,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Thức ăn này không hiệu quả cho thú cưng của tôi 🙁💤',
//         userId: 1012,
//         productId: 19,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Sản phẩm này gây ra vấn đề với tiêu hóa của thú cưng của tôi 🙁🤢',
//         userId: 1021,
//         productId: 1,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Không hài lòng với sản phẩm, chất lượng không tốt 🙁💩',
//         userId: 1022,
//         productId: 6,
//         star: 1,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã thử sản phẩm này và thú cưng của tôi đã bị ảnh hưởng xấu 🙁😔',
//         userId: 1011,
//         productId: 7,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Thức ăn này gây ra vấn đề với hệ tiêu hóa của thú cưng của tôi 🙁💩',
//         userId: 1012,
//         productId: 17,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Tôi đã mua sản phẩm này và thấy nó không hiệu quả cho thú cưng của tôi 🙁💤',
//         userId: 1021,
//         productId: 18,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Sản phẩm này có chất lượng kém và giá cả quá cao 🙁💰',
//         userId: 1022,
//         productId: 19,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: 'Thú cưng của tôi từ chối ăn sản phẩm này 🙁🐶🙅♀️',
//         userId: 1011,
//         productId: 1,
//         star: 0,
//         sentiment: '',
//         userName: '',
//     },
//     {
//         contents: '1 Tôi đã thử sản phẩm này nhưng thấy nó không phù hợp cho thú cưng của tôi 🙁🙅♂️',
//         userId: 1012,
//         productId: 6,
//         star: 2,
//         sentiment: '',
//         userName: '',
//     },
// ];

const Radio = () => {
    const postUrl = 'http://127.0.0.1:8000/feedback/analyze/';
    const feedbackurl = 'http://127.0.0.1:8000/feedback/getAll/';
    const feadbackRadio = 'http://127.0.0.1:8000/feedback/radio/';
    const categoryUrl = 'https://localhost:44303/api/Categories';
    const productUrl = 'https://localhost:44303/api/Products';
    const starRadioUrl = 'http://127.0.0.1:8000/star/radio/';
    const [catList, setCatList] = useState([]);
    const [category, setCategory] = useState('0');
    const [productList, setProductList] = useState([]);
    const [product, setProduct] = useState('0');
    const [data, setData] = useState([]);
    const [starData, setStarData] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [numberOfFb, setNumberOfFb] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const radio = await axios.get(feadbackRadio);
            const radioData = radio.data;
            setData([
                { name: 'Positive', value: parseFloat((radioData.positive * 100).toFixed(2)) },
                { name: 'Negative', value: parseFloat((radioData.negative * 100).toFixed(2)) },
                { name: 'Neutral', value: parseFloat((radioData.neutral * 100).toFixed(2)) },
            ]);

            const radioStar = await axios.get(starRadioUrl);
            const radioStarData = radioStar.data;
            setStarData([
                { name: '0 star', value: radioStarData.zero },
                { name: '1 star', value: radioStarData.one },
                { name: '2 star', value: radioStarData.two },
                { name: '3 star', value: radioStarData.three },
                { name: '4 star', value: radioStarData.four },
                { name: '5 star', value: radioStarData.five },
            ]);
            const response = await axios.get(categoryUrl);
            setCatList(response.data);
            const productResponse = await axios.get(productUrl);
            setProductList(productResponse.data);

            const fbrespone = await axios.get(feedbackurl);
            const fbData = fbrespone.data;
            setFeedbacks(fbData);
            setNumberOfFb({
                positive: (radioData.positive * fbData.length).toFixed(0),
                negative: (radioData.negative * fbData.length).toFixed(0),
                neutral: (radioData.neutral * fbData.length).toFixed(0),
            });
        };
        fetchData();
    }, []);

    const COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#800080', 'FF9966'];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div
                    className="custom-tooltip"
                    style={{
                        backgroundColor: '#ffff',
                        padding: '5px',
                        border: '1px solid #cccc',
                    }}
                >
                    <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
                </div>
            );
        }
        return null;
    };

    const selectHandle = async (e) => {
        const value = e.target.value;
        if (value === 'All') {
            const catId = document.getElementById('selectCategory');
            catId.classList.add('select_hiden');
            const ProductId = document.getElementById('selectProduct');
            ProductId.classList.add('select_hiden');
            const radio = await axios.get(feadbackRadio);
            const radioData = radio.data;
            setData([
                { name: 'Positive', value: parseFloat((radioData.positive * 100).toFixed(2)) },
                { name: 'Negative', value: parseFloat((radioData.negative * 100).toFixed(2)) },
                { name: 'Neutral', value: parseFloat((radioData.neutral * 100).toFixed(2)) },
            ]);
            const radioStar = await axios.get(starRadioUrl);
            const radioStarData = radioStar.data;
            setStarData([
                { name: '0 star', value: radioStarData.zero },
                { name: '1 star', value: radioStarData.one },
                { name: '2 star', value: radioStarData.two },
                { name: '3 star', value: radioStarData.three },
                { name: '4 star', value: radioStarData.four },
                { name: '5 star', value: radioStarData.five },
            ]);

            const fbrespone = await axios.get(feedbackurl);
            const fbData = fbrespone.data;
            setFeedbacks(fbData);

            setNumberOfFb({
                positive: (radioData.positive * fbData.length).toFixed(0),
                negative: (radioData.negative * fbData.length).toFixed(0),
                neutral: (radioData.neutral * fbData.length).toFixed(0),
            });
        } else if (value === 'Category') {
            const catId = document.getElementById('selectCategory');
            catId.classList.remove('select_hiden');
            const ProductId = document.getElementById('selectProduct');
            ProductId.classList.add('select_hiden');
        } else {
            const ProductId = document.getElementById('selectProduct');
            ProductId.classList.remove('select_hiden');
            const catId = document.getElementById('selectCategory');
            catId.classList.add('select_hiden');
        }
    };

    const categorySelected = async (e) => {
        setCategory(e.target.value);
        const CatID = e.target.value;
        const radio = await axios.get(`${feadbackRadio}category/${CatID}`);
        const radioData = radio.data;
        setData([
            { name: 'Positive', value: parseFloat((radioData.positive * 100).toFixed(2)) },
            { name: 'Negative', value: parseFloat((radioData.negative * 100).toFixed(2)) },
            { name: 'Neutral', value: parseFloat((radioData.neutral * 100).toFixed(2)) },
        ]);

        const fbrespone = await axios.get(`http://127.0.0.1:8000/feedback/get/${CatID}`);
        const fbData = fbrespone.data;
        setFeedbacks(fbData);

        setNumberOfFb({
            positive: (radioData.positive * fbData.length).toFixed(0),
            negative: (radioData.negative * fbData.length).toFixed(0),
            neutral: (radioData.neutral * fbData.length).toFixed(0),
        });

        const star = await axios.get(`${starRadioUrl}category/${CatID}`);
        const starData = star.data;
        setStarData([
            { name: '0 star', value: starData.zero },
            { name: '1 star', value: starData.one },
            { name: '2 star', value: starData.two },
            { name: '3 star', value: starData.three },
            { name: '4 star', value: starData.four },
            { name: '5 star', value: starData.five },
        ]);
    };
    const productSelected = async (e) => {
        setProduct(e.target.value);
        const productID = e.target.value;
        const radio = await axios.get(`${feadbackRadio}productID/${productID}`);
        const radioData = radio.data;
        setData([
            { name: 'Positive', value: parseFloat((radioData.positive * 100).toFixed(2)) },
            { name: 'Negative', value: parseFloat((radioData.negative * 100).toFixed(2)) },
            { name: 'Neutral', value: parseFloat((radioData.neutral * 100).toFixed(2)) },
        ]);

        const fbrespone = await axios.get(`http://127.0.0.1:8000/feedback/get/product/${productID}`);
        const fbData = fbrespone.data;
        setFeedbacks(fbData);

        setNumberOfFb({
            positive: radioData.positive * fbData.length,
            negative: radioData.negative * fbData.length,
            neutral: radioData.neutral * fbData.length,
        });

        const star = await axios.get(`${starRadioUrl}productID/${productID}`);
        const starData = star.data;
        setStarData([
            { name: '0 star', value: starData.zero },
            { name: '1 star', value: starData.one },
            { name: '2 star', value: starData.two },
            { name: '3 star', value: starData.three },
            { name: '4 star', value: starData.four },
            { name: '5 star', value: starData.five },
        ]);

        // setStarData(starData);
    };
    // const insert = async () => {
    //     for (var i = 0; i < datainsert.length; i++) {
    //         await axios.post(postUrl, datainsert[i]);
    //     }
    // };
    return (
        <div className="radioContainer">
            <div className="selectSection">
                <div className="SelectRadio">
                    <div className="SelectRadio_title">Chọn loại biểu đồ:</div>
                    <div>
                        <select name="chart" id="chartID" onChange={selectHandle}>
                            <option value="All">Tất cả</option>
                            <option value="Category">Biểu đồ theo danh mục sản phẩm</option>
                            <option value="Product">Biểu đồ theo theo id sản phẩm</option>
                        </select>
                    </div>
                </div>
                <div className="SelectRadio select_hiden" id="selectCategory">
                    <div className="SelectRadio_title">Chọn danh mục:</div>
                    <div className="">
                        <select name="category" id="category" value={category} onChange={categorySelected}>
                            {' '}
                            <option disabled selected value="0">
                                Chọn danh mục
                            </option>
                            {catList
                                ? catList.map((cat, index) => (
                                      <option value={cat.categoryId} key={index}>
                                          {cat.display}
                                      </option>
                                  ))
                                : ''}
                        </select>
                    </div>
                </div>
                <div className="SelectRadio select_hiden" id="selectProduct">
                    <div className="SelectRadio_title">Chọn sản phẩm :</div>
                    <div className="">
                        <select name="product" id="product" value={product} onChange={productSelected}>
                            {' '}
                            <option disabled selected value="0">
                                Chọn sản phẩm
                            </option>
                            {productList
                                ? productList.map((product, index) => (
                                      <option value={product.id} key={index}>
                                          {product.name}
                                      </option>
                                  ))
                                : ''}
                        </select>
                    </div>
                </div>
            </div>
            <div className="NumberOfFeedbackSection">
                <div className="NumberOfFeedbackSection_header display_flex">
                    <div className="title_section">Tổng số lượng phản hồi của khách hàng</div>
                </div>
                <ul className="numOfFb_midlle display_flex">
                    <li className="positive_fb">
                        <div className="display_flex">
                            <img className="icon_fb" src={PosImg} alt="" />
                            <div className="NumFBcontent">
                                <div className="phanhoi ">Tích cực</div>
                                <div className="NumFB green">{numberOfFb.positive}</div>
                                <div className="phanhoi">Phản hồi</div>
                            </div>
                        </div>
                    </li>
                    <li className=" negative_fb">
                        <div className="display_flex">
                            <img className="icon_fb" src={NeuImg} alt="" />
                            <div className="NumFBcontent">
                                <div className="phanhoi ">Trung tính</div>
                                <div className="NumFB blue">{numberOfFb.neutral}</div>
                                <div className="phanhoi">Phản hồi</div>
                            </div>
                        </div>
                    </li>
                    <li className=" neutral_fb">
                        <div className="display_flex ">
                            <img className="icon_fb" src={NegImg} alt="" />
                            <div className="NumFBcontent">
                                <div className="phanhoi ">Tiêu cực</div>
                                <div className="NumFB red">{numberOfFb.negative}</div>
                                <div className="phanhoi">Phản hồi</div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="NumberOfFeedbackSection_btn"></div>
            </div>
            <div className="radioContent">
                <div className="chart_table display_flex">
                    <div className="column_2">
                        <div className="fb_chart hov_Scale">
                            <PieChart width={540} height={300}>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                            </PieChart>
                        </div>
                        <div className="fb_chart hov_Scale">
                            <ColumnChart data={starData} />
                        </div>
                    </div>
                    <div className="column_2 fb_table ">
                        <div className="Table_name">Bảng thống kê phản hồi khách hàng</div>
                        <ReviewTable reviews={feedbacks}></ReviewTable>
                    </div>
                </div>

                <div className="fb_Ads">
                    <Feedback></Feedback>
                </div>
                {/* <button onClick={insert}>inset</button> */}
            </div>
        </div>
    );
};

export default Radio;
