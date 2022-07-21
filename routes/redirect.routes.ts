import { Router, Request, Response } from 'express';
import Link from '../models/Link';

const router = Router();

router.get('/:code', async (req: Request, res: Response) => {
  try {
    const link = await Link.findOne({ code: req.params.code });

    if (link) {
      link.clicks = (link.clicks || 0) + 1;
      await link.save();
      return res.redirect(link.from);
    }

    res.status(404).json('Link not found');

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again later' })
  }
})

module.exports = router;