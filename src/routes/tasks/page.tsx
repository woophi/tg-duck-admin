import { TaskItem } from '@core/tasks';
import { Button, CardHeader, Grid, Link } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { useLoaderData } from 'react-router-dom';
import { tableTasksConfig } from './TableConfig';
import { tasksLoader } from './loader';

const TasksPage = () => {
  const { tasks } = useLoaderData() as { tasks: TaskItem[] };

  return (
    <Grid item xs={12}>
      <BaseList
        data={tasks}
        config={tableTasksConfig}
        listHeader={
          <CardHeader
            title="Ducky tasks"
            action={
              <Link href="/tasks/create">
                <Button variant="contained">create</Button>
              </Link>
            }
          />
        }
      />
    </Grid>
  );
};

export const Component = TasksPage;
export const loader = tasksLoader;
