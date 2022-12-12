import stylish from './stylish.js';

const formatChoice = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`Unknown formatter: '${format}'!`);
  }
};

export default formatChoice;
