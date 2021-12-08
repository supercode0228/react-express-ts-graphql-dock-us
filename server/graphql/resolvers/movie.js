const axios = require('axios');
const { TMDURI, TMDKEY } = require('../../config/config');

module.exports = {
  Query: {
    movies: async (_, args) => {
      const { page, type, searchQuery } = args;
      try {
        if (!searchQuery) {
          const data =  await axios.get(`${TMDURI}/movie/${type}?api_key=${TMDKEY}&page=${page}&language=en-US`)
          .then(response => { return response.data})
          .catch(error => {console.log(error); return error});
          return data;
        } else {
          const data =  await axios.get(`${TMDURI}/search/movie?api_key=${TMDKEY}&query=${searchQuery}&page=${page}&language=en-US`)
          .then(response => { return response.data})
          .catch(error => {console.log(error); return error});
          return data;
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    movie: async (_, args) => {
      const { id } = args;
      try {
        const data = await axios.get(`${TMDURI}/movie/${id}?api_key=${TMDKEY}&language=en-US`)
          .then(response => { return response.data})
          .catch(error => {console.log(error); return error});
        return data;
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  },
}