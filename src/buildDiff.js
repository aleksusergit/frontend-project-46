import _ from 'lodash';

const getDifferences = (getData1, getData2) => {
  const unitedKeys = _.sortBy(_.union(Object.keys(getData1), Object.keys(getData2)));

  const result = unitedKeys.map((key) => {
    if (typeof getData1[key] === 'object' && typeof getData2[key] === 'object') {
      return { key, children: getDifferences(getData1[key], getData2[key]), type: 'nested' };
    }
    if (!_.has(getData1, key)) {
      return { key, value2: getData2[key], type: 'added' };
    }
    if (!_.has(getData2, key)) {
      return { key, value1: getData1[key], type: 'deleted' };
    }
    if (getData1[key] !== getData2[key]) {
      return {
        key,
        value1: getData1[key],
        value2: getData2[key],
        type: 'changed',
      };
    }
    return { key, value1: getData1[key], type: 'unchanged' };
  });

  return result;
};

export default getDifferences;
