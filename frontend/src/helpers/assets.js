const comparatorEarliestDueDate = (a, b) => {
  const dateA = new Date(a.dueDate.year, a.dueDate.month - 1, a.dueDate.day); 
  const dateB = new Date(b.dueDate.year, b.dueDate.month - 1, b.dueDate.day);
  return dateA - dateB;
};
const comparatorLatesttDueDate = (a, b) => {
  const dateA = new Date(a.dueDate.year, a.dueDate.month - 1, a.dueDate.day); 
  const dateB = new Date(b.dueDate.year, b.dueDate.month - 1, b.dueDate.day);
  return dateB - dateA;
};
export const sortByDueDate = ({ tasks, isSortByLatest }) => {
  if (isSortByLatest) {
    return tasks.sort(comparatorLatesttDueDate);
  } else {
    return tasks.sort(comparatorEarliestDueDate);
  }
};

const comparatorEarliestCreatedDate = (a, b) => {
  const dateA = new Date(a.createdAt);
  const dateB = new Date(b.createdAt);
  return dateA - dateB;
};
const comparatorLatestCreatedDate = (a, b) => {
  const dateA = new Date(a.createdAt); 
  const dateB = new Date(b.createdAt);
  return dateB - dateA;
};

export const sortByCreatedDate = ({ tasks, isSortByLatest }) => {
  if (isSortByLatest) {
    return tasks.sort(comparatorLatestCreatedDate);
  } else {
    return tasks.sort(comparatorEarliestCreatedDate);
  }
};


export const sortTasksByPriority = ({tasks, isHighestPriority}) => {
    const sortedTasks = [...tasks];
  
    sortedTasks.sort((a, b) => {
      const priorityA = a.priority;
      const priorityB = b.priority;
  
      if (isHighestPriority) {
        // Sort in ascending order for highest priority
        return priorityA - priorityB;
      } else {
        // Sort in descending order for lowest priority
        return priorityB - priorityA;
      }
    });
  
    return sortedTasks;
  };