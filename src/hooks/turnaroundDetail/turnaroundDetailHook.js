import { useState } from 'react';

import {
  TURNAROUNDS_DETAILS_COMPONENT_SIZE_LARGE,
  TURNAROUNDS_DETAILS_COMPONENT_SIZE_SMALL,
} from 'src/constants/turnaroundDetail/turnaroundsDetails';

export default function turnaroundDetailHook(selectedTasksDetails, closeTask, componentSize, handleCloseTurnaround) {
  const [hasCommentsOpen, setCommentsOpen] = useState(false);
  const [hasReadOnlyCommentsOpen, setHasReadOnlyCommentsOpen] = useState(false);
  const [hasMessageOpen, setMessageOpen] = useState(false);
  const [hasSelectedTask, setHasSelectedTask] = useState(false);
  const [hasReportOpen, setHasReportOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  let componentSizeSplit = componentSize;

  const handleTaskClose = () => {
    if (selectedTask) {
      const selectedTasksCopy = [...selectedTasksDetails];
      const filteredSelectedTasksCopy = selectedTasksCopy.filter(
        (selectedTaskCheck) => selectedTaskCheck.id !== selectedTask.id,
      );
      closeTask(filteredSelectedTasksCopy);
    }
  };

  const handleTaskSelection = (taskSelected, fromComment = false) => {
    handleTaskClose();
    if ((selectedTask === taskSelected || taskSelected === null) && !fromComment) {
      setHasSelectedTask(false);
      setSelectedTask(null);
    } else {
      setCommentsOpen(false);
      setMessageOpen(false);
      setHasSelectedTask(true);
      setSelectedTask(taskSelected);
      setHasReportOpen(false);
      setHasReadOnlyCommentsOpen(false);
    }
  };

  const handleOpenReport = (open) => {
    setHasReportOpen(open);
    setHasSelectedTask(false);
    setCommentsOpen(false);
    setMessageOpen(false);
    setHasReadOnlyCommentsOpen(false);
  };

  const openReadOnlyComments = () => {
    setHasReportOpen(false);
    setMessageOpen(false);
    setHasSelectedTask(false);
    setHasReadOnlyCommentsOpen(true);
    setCommentsOpen(false);
  };

  const closeReadOnlyComments = () => {
    setHasReadOnlyCommentsOpen(false);
    handleTaskClose();
  };

  const openComments = () => {
    setHasReportOpen(false);
    setMessageOpen(false);
    setHasSelectedTask(false);
    setCommentsOpen(true);
    setHasReadOnlyCommentsOpen(false);
  };

  const closeComments = () => {
    setHasSelectedTask(true);
    setCommentsOpen(false);
  };

  const openMessages = () => {
    setHasReportOpen(false);
    setCommentsOpen(false);
    setHasSelectedTask(false);
    setMessageOpen(true);
    setHasReadOnlyCommentsOpen(false);
  };

  const closeMessages = () => {
    setHasSelectedTask(true);
    setMessageOpen(false);
  };

  const closeTurnaroundCompleteData = (turnaroundData) => {
    handleCloseTurnaround(turnaroundData);
    handleTaskClose();
  };

  const hasSubViewActive = () => (
    hasReportOpen || hasSelectedTask || hasCommentsOpen
    || hasMessageOpen || hasReadOnlyCommentsOpen);
  const isViewSplit = () => (componentSize === TURNAROUNDS_DETAILS_COMPONENT_SIZE_LARGE && hasSubViewActive());
  const isDetailViewNotVisible = () => (
    componentSize === TURNAROUNDS_DETAILS_COMPONENT_SIZE_SMALL && hasSubViewActive()
  );

  if (isViewSplit()) {
    componentSizeSplit = `${TURNAROUNDS_DETAILS_COMPONENT_SIZE_LARGE} splitView`;
  }

  return {
    closeTurnaroundCompleteData,
    componentSizeSplit,
    openComments,
    openReadOnlyComments,
    closeComments,
    closeReadOnlyComments,
    openMessages,
    closeMessages,
    handleOpenReport,
    handleTaskSelection,
    isDetailViewNotVisible,
    isViewSplit,
    hasCommentsOpen,
    hasMessageOpen,
    hasReadOnlyCommentsOpen,
    hasReportOpen,
    hasSelectedTask,
    hasSubViewActive,
    selectedTask,
  };
}
