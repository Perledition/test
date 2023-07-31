import { Send } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import './QueryInput.css';
import { addToChatHistory, createChatBox } from '../utils/utils';


interface Props {
  className: string;
}

function sanitizeString(input: string) {
  // Define the characters that need to be removed
  const forbiddenCharacters = ['"', "'", '\\'];

  // Remove forbidden characters from the input string
  const sanitizedString = input
    .split(' ')
    .filter(char => !forbiddenCharacters.includes(char))
    .join(' ');

  return sanitizedString;
}


async function handleQuery() {
  const prompt = (document.getElementById("query-input") as HTMLInputElement).value;
  (document.getElementById("query-input") as HTMLInputElement).value = "";

  const qa_setting = localStorage.getItem("documentContent");
  if (qa_setting) {
    const context = JSON.parse(qa_setting).text;
    const id = createChatBox(prompt);

    fetch("https://apps.beam.cloud/gb8y1", {
      "method": "POST",
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate",
        "Authorization": "Basic ZjU2NWU4NWU2ZDFjNDhkNTU3NzhmOWJmZGM5YzIwMTE6OTk3NjNhNTlhYzU5N2YxMzBjMzVmYjkxNzkxNDZkNDc=",
        "Content-Type": "application/json"
      },
      "body": JSON.stringify({
        "context": sanitizeString(context),  
        "query": prompt
      })
    })
    .then((response) => response.json())
    .then((data) => {


      const chatRequest = {
        id: id,
        query: data.query,
        response: data.response,
        start: data.start,
        end: data.end,
        score: data.end
      }

      addToChatHistory(chatRequest);
    })
    .catch((err) => {
        console.log(err.message);
    });

    const chatRequest = {
      id: id,
      query: prompt,
      response: "Hello there",
      start: 0,
      end: 1,
      score: 0.0321
    }

    addToChatHistory(chatRequest);

  }
  };

export default function QueryInput({className}: Props) {
  return (
    <Paper component="form" className={className}>
      <InputBase
        id="query-input"
        className="input"
        placeholder="Stelle deine Frage..."
        inputProps={{ 'aria-label': 'query' }}
      />
      <Divider className="divider" orientation="vertical" />
      <IconButton color="primary" id="query-button" className="iconButton" aria-label="send" onClick={handleQuery}>
        <Send />
      </IconButton>
    </Paper>
  );
}
