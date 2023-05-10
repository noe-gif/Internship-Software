import axios from 'axios';

import { BASE_URL } from 'src/utils/urlAPIs';

const updateAddInfos = (token, addInfoData) =>
  axios.patch(
    `${BASE_URL}/task_additional_information/${addInfoData.addInfoId}`,
    addInfoData.data,
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } },
  );

const getTaskDetail = (token, taskId) =>
  axios.get(
    `${BASE_URL}/task/${taskId}`,
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } },
  );

const updateTaskApplicable = (token, updateTaskApplicableData) =>
  axios.patch(
    `${BASE_URL}/task/${updateTaskApplicableData.taskId}`,
    updateTaskApplicableData.data,
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } },
  );

const sendTaskComment = (token, sendTaskCommentData) =>
  axios.post(
    `${BASE_URL}/task/${sendTaskCommentData.taskId}/comment`,
    { comment: sendTaskCommentData.data },
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } },
  );

const updateTaskTiming = (token, updateTaskTimingData) =>
  axios.post(
    `${BASE_URL}/task/${updateTaskTimingData.taskId}`,
    { task: updateTaskTimingData.task },
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } },
  );

const getTaskComments = (token, taskId) =>
  axios.get(
    `${BASE_URL}/task/${taskId}/comments`,
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } },
  );

const getTaskMessages = (token, taskId) =>
  axios.get(
    `${BASE_URL}/task/${taskId}/messages`,
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } },
  );

const deleteComment = (token, commentId) =>
  axios.delete(
    `${BASE_URL}/task_comment/${commentId}`,
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } },
  );

const getCommentPicture = (token, commentId) =>
  axios.get(
    `${BASE_URL}/task_comment/${commentId}/picture`,
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } },
  );

export default {
  deleteComment,
  getCommentPicture,
  getTaskComments,
  getTaskDetail,
  getTaskMessages,
  sendTaskComment,
  updateAddInfos,
  updateTaskApplicable,
  updateTaskTiming,
};
