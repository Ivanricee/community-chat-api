import { RESTDataSource } from 'apollo-datasource-rest'

export class EmojisAPI extends RESTDataSource {
  constructor(){
    super()
    this.baseURL = "https://api.emojisworld.fr/v1/";
  }
  async getEmoji(id){
    try{
      const data = await this.get(`emojis/${encodeURIComponent(id)}`, null, {
        cacheOptions: { ttl: 60 },
      });
      return data;
    } catch (error){
      console.log(error)
    }

  }
}
