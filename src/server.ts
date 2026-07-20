import app from './app';
import { ENV } from './config/env';

const PORT = process.env.PORT || ENV.PORT || 5001;

app.listen(PORT, () => {
  console.log(`[INFO] WriteFlow backend listening on port ${PORT}`);
});
