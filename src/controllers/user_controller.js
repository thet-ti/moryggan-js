import express from 'express';
import httpStatus from 'http-status';
import { UserService } from '../service/user_service';
import { paginationHelper } from '../utils/pagination';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const response = await UserService.create(req.body);

    return res.status(httpStatus.OK).json(response);
  } catch (error) {
    throw new Error(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const response = await UserService.getAll(paginationHelper(req));

    return res.status(httpStatus.OK).json(response);
  } catch (error) {
    throw new Error(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const response = await UserService.getById(req.params.id);

    return res.status(httpStatus.OK).json(response);
  } catch (error) {
    throw new Error(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const response = await UserService.updateById(req.params.id, req.body);

    return res.status(httpStatus.OK).json(response);
  } catch (error) {
    throw new Error(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const response = await UserService.deleteById(req.params.id);

    return res.status(httpStatus.OK).json(response);
  } catch (error) {
    throw new Error(error);
  }
});

export default router;
