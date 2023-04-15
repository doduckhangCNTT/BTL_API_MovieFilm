import express from "express";
import uploadImgCtrl from "../controllers/uploadImgCtrl";

const router = express.Router();

router.post("/upload", uploadImgCtrl.uploadImg);

router.post("/upload_imgVideo", uploadImgCtrl.uploadImgAndVideo);

router.post("/destroy", uploadImgCtrl.destroyImg);

router.post("/destroyVideo", uploadImgCtrl.destroyVideo);

export default router;
