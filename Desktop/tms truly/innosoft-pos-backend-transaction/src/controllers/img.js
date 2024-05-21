const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
const express = require('express');
const multer = require('multer');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

const upload = multer({ dest: 'img/' });

app.post('/update-profile-photo', upload.single('fileToUpload'), async (req, res) => {
  try {
    const KB = 1024;
    const MB = 1048576;

    const imgfile = req.file.originalname;
    const targetDir = 'img/';
    const targetFile = path.join(targetDir, path.basename(req.file.originalname));
    const imageFileType = path.extname(targetFile).toLowerCase();

    if (!imgfile) {
      return res.redirect('/profile.php');
    }

    const extension = imgfile.slice(-4);
    if (imageFileType !== '.jpg' && imageFileType !== '.png' && imageFileType !== '.jpeg') {
      return res.redirect('/profile.php');
    }

    if (req.file.size > 2 * MB) {
      return res.redirect('/profile.php');
    }

    const imgnewfile = crypto.createHash('md5').update(imgfile).digest('hex') + Date.now() + extension;

    // Move image to directory
    await promisify(fs.rename)(req.file.path, path.join('img/', imgnewfile));

    // Update database
    await pool.query('UPDATE "user" SET "profileImage" = $1 WHERE "id" = $2', [imgnewfile, req.user.id]);

    return res.redirect('/profile.php');
  } catch (error) {
    console.error(error);
    return res.redirect('/profile.php');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
