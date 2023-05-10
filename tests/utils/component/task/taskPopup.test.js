/**
 * @jest-environment jsdom
*/

import { renderHook, act } from "@testing-library/react-hooks";

import '@testing-library/jest-dom';

import { checkIfEndOnlyTask } from 'src/utils/component/task/taskPopup';

describe('extractUpdatedTaskFromTurnaround', () => {
    it('should set filteredTask when turnaroundTask has been updated and status is SUCCESS', () => {
        const taskDescription = {start: "start description",
                                end: "End description"};
        const preparedForComponentTaskDescription = [{title: "Start", description: "start description", id: 2}, {title: "End", description: "End description", id: 1}];

        expect(checkIfEndOnlyTask(taskDescription)).toStrictEqual(preparedForComponentTaskDescription);
    });
    it('should set filteredTask when turnaroundTask has been updated and status is SUCCESS', () => {
        const taskDescription = { end: "End description" };
        const preparedForComponentTaskDescription = [{title: "End", description: "End description", id: 1}];

        expect(checkIfEndOnlyTask(taskDescription)).toStrictEqual(preparedForComponentTaskDescription);
    });
    it('should set filteredTask when turnaroundTask has been updated and status is SUCCESS', () => {
        const taskDescription = null;
        const preparedForComponentTaskDescription = [{ title: 'End', description: undefined, id: 1 }];

        expect(checkIfEndOnlyTask(taskDescription)).toStrictEqual(preparedForComponentTaskDescription);
    });
    it('should set filteredTask when turnaroundTask has been updated and status is SUCCESS', () => {
        const taskDescription = {start: "",
                                end: ""};
        const preparedForComponentTaskDescription = [{title: "End", description: "", id: 1}];

        expect(checkIfEndOnlyTask(taskDescription)).toStrictEqual(preparedForComponentTaskDescription);
    });
});
