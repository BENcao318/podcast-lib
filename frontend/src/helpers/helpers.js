function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} years ago`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} months ago`;
  }
  interval = seconds / 86400;
  if (interval > 2) {
    return `${Math.floor(interval)} days ago`;
  } else if (interval > 1) {
    return `${Math.floor(interval)} day ago`;
  }
  interval = seconds / 3600;
  if (interval > 2) {
    return `${Math.floor(interval)} hours ago`;
  } else if (interval > 1) {
    return `${Math.floor(interval)} hour ago`;
  }
  interval = seconds / 60;
  if (interval > 2) {
    return `${Math.floor(interval)} minutes ago`;
  } else if (interval > 1) {
    return `${Math.floor(interval)} minute ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

export {
  timeSince
};