import { FileInfo, useUploader } from '@core/files';
import { SpecialItem } from '@core/specials';
import { Box, Button, CircularProgress, MenuItem, TextField, Typography } from '@mui/material';
import { CircularProgressWithLabel } from '@ui/ProgressWithLabel';
import { useEffect, useState } from 'react';
import { Form, useActionData, useLoaderData, useNavigation } from 'react-router-dom';
import { specialOptions } from '../constants';
import { updateSpecialAction } from './action';
import { specialLoader } from './loader';

const EditSpecialPage = () => {
  const { special } = useLoaderData() as { special: SpecialItem | null };
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const uploader = useUploader({ onFinishUpload: setFileInfo });

  const navigation = useNavigation();
  const isLoading = navigation.formData?.get('name') != null;

  const actionData = useActionData() as { error: string } | undefined;

  useEffect(() => {
    if (special?.file) {
      setFileInfo({
        id: special.file.id,
        url: special.file.fileUrl,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!special) {
    return <Typography>Special not found</Typography>;
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 500,
        margin: 'auto',
      }}
    >
      <Form method="post">
        <input type="hidden" name="fileId" value={fileInfo?.id} />
        <input {...uploader.getInputProps()} />
        <Box display="flex" gap={2} flexDirection="column">
          <Button
            sx={{ width: 'max-content' }}
            variant="contained"
            disabled={!!uploader.progress || isLoading}
            onClick={uploader.open}
          >
            {uploader.progress ? (
              <CircularProgressWithLabel size={24} color="primary" value={uploader.progress} />
            ) : (
              'add file'
            )}
          </Button>
          {fileInfo?.url ? (
            <Box
              component="img"
              src={import.meta.env.VITE_SERVER_URL + fileInfo.url}
              width={250}
              height={250}
              sx={{ objectFit: 'contain', border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px', overflow: 'hidden' }}
            />
          ) : null}
        </Box>
        <TextField margin="normal" required fullWidth label="Name" name="name" autoFocus defaultValue={special.name} />

        <TextField margin="normal" required fullWidth select label="Type" defaultValue={special.type} name="type">
          {specialOptions.map(o => (
            <MenuItem key={o.value} value={o.value}>
              {o.title}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="normal"
          fullWidth
          label="Description"
          name="description"
          multiline
          rows={4}
          defaultValue={special.description}
        />
        <TextField margin="normal" fullWidth label="Effect" name="effect" multiline rows={4} defaultValue={special.effect} />
        <TextField
          margin="normal"
          fullWidth
          required
          label="Cooldown (in seconds)"
          name="cooldown"
          defaultValue={special.cooldown}
          type="number"
        />
        <TextField
          margin="normal"
          fullWidth
          required
          label="Duration (in seconds)"
          name="duration"
          defaultValue={special.duration}
          type="number"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Required lvl"
          name="requiredLvl"
          defaultValue={special.requiredLvl}
          type="number"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Position"
          name="position"
          defaultValue={special.position}
          type="number"
        />

        <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
          {isLoading ? <CircularProgress size={24} color="primary" /> : 'save'}
        </Button>

        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </Box>
  );
};

export const Component = EditSpecialPage;
export const action = updateSpecialAction;
export const loader = specialLoader;
