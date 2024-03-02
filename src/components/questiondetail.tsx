import { Box, Button, IconButton, Stack, Typography } from "@mui/material"
import ShareIcon from "@mui/icons-material/Share";
import Question from "../types"
import AuthorAvatar from "./authoravatar"

type Props = { question: Question, onAnswer?: () => void }

const QuestionDetail: React.FunctionComponent<Props> = ({ question, onAnswer }) => {
  return <>
    <Stack direction="row" justifyContent="space-between" padding={2}>
      <Box>
        <Typography variant="h5">{question.summary}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          asked by {question.author.id}
        </Typography>
        <Typography variant="body1">{question.description}</Typography>
      </Box>
      <Box>
        <AuthorAvatar author={question.author} />
      </Box>
    </Stack>
    <Stack direction="row" justifyContent="space-between" paddingX={2}>
      <Stack direction="row">
        <Button size="small" disabled>
          Report
        </Button>
        <Button size="small" onClick={onAnswer}>
          Answer
        </Button>
      </Stack>
      <IconButton disabled>
        <ShareIcon />
      </IconButton>
    </Stack>
  </>
}

export default QuestionDetail
