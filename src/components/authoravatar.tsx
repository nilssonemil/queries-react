import { Avatar, Box, Typography } from "@mui/material"
import { Author } from "../types"

type Props = { author: Author }

const AuthorAvatar: React.FunctionComponent<Props> = ({ author }) => {
  return (
    <Box>
      <Avatar
        alt="avatar"
        src={author.avatar}
        sx={{ width: 56, height: 56 }}
      />
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {author.id}
      </Typography>
    </Box>
  )

}

export default AuthorAvatar
