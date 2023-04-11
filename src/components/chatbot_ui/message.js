import avatar from "../../assets/image/images (1).png";
import {Avatar, Box, Chip, Typography} from "@mui/material";

export default function Message(props) {
  return (
    <div>
      <Box
        sx={{
          my: 2,
          display: "flex",
          flexFlow: "row",
          justifyContent: props.isCustomer ? "right" : "left",
        }}
      >
        {!props.isCustomer && (
          <Avatar sx={{mr: 1, bgcolor: "primary.main"}}>
            <img src={avatar} alt="Chatbot avatar" width={32}/>
          </Avatar>
        )}
        <Box>
          <Typography gutterBottom variant="body2" component="div" sx={{mt: 1.5}}>
            {props.content}
          </Typography>
          {props.image && (
            <img src={props.image} alt="Bot response" style={{width: "100%"}}/>
          )}
          {!props.isCustomer && props.choices && (
            <Box sx={{mt: 1}}>
              {props.choices.map((choice, index) => (
                <Chip
                  key={index}
                  label={choice}
                  onClick={() => props.handleChoice(choice)}
                  sx={{mr: 0.5, mb: 0.5}}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}