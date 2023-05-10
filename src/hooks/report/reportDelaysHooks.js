import { useState } from 'react';

export default function reportDelaysHooks(setReportDelays) {
  const [delayLinesContent, setDelayLinesContent] = useState([]);

  const checkIsLineComplete = (line) => (line?.duration !== undefined && line?.code?.length > 0);

  const updateLineData = (targetElement) => {
    const oldLineData = delayLinesContent.find((line) => line.lineName === targetElement.name);

    if (targetElement.id.includes('Duration')) {
      return ({ ...oldLineData, lineName: targetElement.name, duration: targetElement.value });
    } else {
      return ({ ...oldLineData, lineName: targetElement.name, code: targetElement.value });
    }
  };

  const filterCompletedLines = (linesContent) => {
    const newReportDelays = linesContent.map((line) => {
      if (checkIsLineComplete(line)) {
        return { code: line.code, duration: Number(line.duration) };
      } else {
        return null;
      }
    });

    return (newReportDelays.filter((delay) => delay !== null));
  };

  const onChangeDelayInput = (event) => {
    event.preventDefault();

    const filteredLinesData = delayLinesContent.filter((line) => line.lineName !== event.target.name);

    filteredLinesData.push(updateLineData(event.target));

    setDelayLinesContent(filteredLinesData);
    setReportDelays(filterCompletedLines(filteredLinesData));
  };

  return {
    onChangeDelayInput,
    setDelayLinesContent,
  };
}
