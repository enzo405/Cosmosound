export const formatDuration = (duration: number): string => {
  let minutes = Math.floor(duration / 60);
  let seconds = (duration - minutes * 60).toString();
  if (Number(seconds) < 10) {
    seconds = `0${seconds}`;
  }
  return minutes > 1 ? `${minutes}:${seconds}` : `0:${seconds}`;
};

export const formatDurationWithLabel = (duration: number): string => {
  let minutes = Math.floor(duration / 60);
  let seconds = (duration - minutes * 60).toString();
  if (Number(seconds) < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes} min ${seconds} sec`;
};

export const formatTime = (date: string): string => {
  let parsedDate = new Date(date);
  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
