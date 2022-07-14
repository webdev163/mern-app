import { Router, Request, Response } from 'express';
import Link from '../models/Link';
import middleware from '../middleware/auth.middleware';
import config from '../config';
import { nanoid } from 'nanoid'
const router = Router();

router.post('/generate', middleware, async (req: Request, res: Response) => {
  try {
    const baseUrl = config.baseUrl;
    const {from} = req.body;
    const code = nanoid();

    const exist = await Link.findOne({ from });

    if (exist) {
      return res.json({ link: exist })
    }

    const to = baseUrl + '/to/' + code;
    const link = new Link({
      code, to, from, owner: req['user'].userId
    });

    await link.save();

    res.status(201).json({  link });

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again later' })
  }
})

router.get('/', middleware, async (req: Request, res: Response) => {
  try {
    const links = await Link.find({owner: req['user'].userId});
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again later' })
  }
})

router.get('/:id', middleware, async (req: Request, res: Response) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again later' })
  }
})

module.exports = router;