const http = require('http');

const data = JSON.stringify({ emailType: 'test', subject: 'test', keyPoints: 'test' });

const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/api/generate-email',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log(body));
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
