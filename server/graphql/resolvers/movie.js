const axios = require('axios');
const redis = require('redis');
const { TMDURI, TMDKEY } = require('../../config/config');

const client = redis.createClient();
client.connect();

const getRedisData = async (key) => {
  const data = await client.get(key);
  return JSON.parse(data);
};

const setRedisData = async (key, data) => {
  await client.set(key, JSON.stringify(data));
};

module.exports = {
  Query: {
    movies: async (_, args) => {
      const { page, type, searchQuery } = args;
      try {
        if (!searchQuery) {

          const data =  await getRedisData("movies");
          if (data) return data;

          return axios.get(`${TMDURI}/movie/${type}?api_key=${TMDKEY}&page=${page}&language=en-US`)
          .then(response => {
            setRedisData("movies", response.data);
            return response.data;
          })
          .catch(error => {console.log(error); return error});
        } else {
          const data =  await getRedisData(searchQuery);
          if (data) return data;
            
          return axios.get(`${TMDURI}/search/movie?api_key=${TMDKEY}&query=${searchQuery}&page=${page}&language=en-US`)
          .then(response => {
            setRedisData(searchQuery, response.data);
            return response.data;
          })
          .catch(error => {console.log(error); return error});
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