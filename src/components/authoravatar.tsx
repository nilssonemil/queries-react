import { Avatar, Box, Stack, Typography } from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Author } from "../types"

type Props = { author: Author }

const AuthorAvatar: React.FunctionComponent<Props> = ({ author }) => {
  return (
    <Stack alignItems="center">
      {author.avatar == null
        ? <AccountCircleIcon sx={{ mr: 1 }} />
        : <Avatar
          alt="avatar"
          src={author.avatar}
          sx={{ width: 56, height: 56, mr: 1 }}
        />
      }
      <Typography variant="body2" color="text.secondary" sx={{ mr: 1, mt: 1 }}>
        {author.id}
      </Typography>
    </Stack>
  )

}

export default AuthorAvatar
