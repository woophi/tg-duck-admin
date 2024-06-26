import { Box, Button, CircularProgress, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Form, useActionData, useLoaderData, useNavigation } from 'react-router-dom';
import { ConfigData, getConfigDataFX } from '../../../core/config';
import { FileInfo } from '../../../core/files/types';
import { useUploader } from '../../../core/files/useUploader';
import { CircularProgressWithLabel } from '../../../ui/ProgressWithLabel';
import { updateConfigAction } from './action';

const ConfigEditPage = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const navigation = useNavigation();
  const isLoading = navigation.formData?.get('techProblem') != null;
  const uploader = useUploader({ onFinishUpload: setFileInfo });
  const actionData = useActionData() as { error: string } | undefined;
  const { config } = useLoaderData() as { config: ConfigData | null };

  useEffect(() => {
    if (config?.file) {
      setFileInfo({
        id: config.file.id,
        url: config.file.fileUrl,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!config) {
    return <Typography>Config not found</Typography>;
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

        <FormControlLabel
          control={<Switch defaultChecked={config.techProblem} />}
          label="Is tech problem"
          name="techProblem"
        />
        <FormControlLabel
          control={<Switch defaultChecked={config.notification} />}
          label="Is notification"
          name="notification"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Notification"
          name="notificationText"
          defaultValue={config.notificationText}
        />

        <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
          {isLoading ? <CircularProgress size={24} color="primary" /> : 'save'}
        </Button>

        {actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
      </Form>
    </Box>
  );
};

export const Component = ConfigEditPage;
export const action = updateConfigAction;
export const loader = async () => {
  const config = await getConfigDataFX();
  return { config };
};
