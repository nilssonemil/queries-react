import { Avatar, Box, Stack, Typography } from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Author } from "../types"

type Props = { author: Author, small?: boolean }

const AuthorAvatar: React.FunctionComponent<Props> = ({ author, small }) => {
  if (small) {
    return <Stack alignItems="center">
      {author.avatar == null
        ? <AccountCircleIcon />
        : <Avatar
          alt="avatar"
          src={author.avatar}
          sx={{ width: 32, height: 32 }}
        />
      }
    </Stack>
  } else {
    return (
      <Stack alignItems="center">
        {author.avatar == null
          ? <AccountCircleIcon />
          : <Avatar
            alt="avatar"
            src={author.avatar}
            sx={{ width: 56, height: 56 }}
          />
        }
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {author.id}
        </Typography>
      </Stack>
    )
  }

}

export default AuthorAvatar
