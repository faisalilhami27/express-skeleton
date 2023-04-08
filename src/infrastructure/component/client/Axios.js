const axios = require('axios');

class Axios {
  #response = null;

  #request = null;

  /**
   * set response for http client
   * @param response
   */
  setResponse(response) {
    this.#response = response;
  }

  /**
   * get response for http client
   * @returns {null}
   */
  getResponse() {
    return this.#response;
  }

  /**
   * set request for http client
   * @param request
   */
  setRequest(request) {
    this.#request = request;
  }

  /**
   * get request for http client
   * @returns {null}
   */
  getRequest() {
    return this.#request;
  }

  /**
   * set http client
   * @param params
   * @returns {Promise<void>}
   */
  async setHttp(params) {
    this.setRequest(params);
    const client = await this.initHttp();
    return this.setResponse(client);
  }

  /**
   * get response from http client
   * @returns {*}
   */
  getHttp() {
    return this.getResponse();
  }

  /**
   * initialization for http client
   * @returns {Promise<AxiosInstance>}
   */
  async initHttp() {
    const options = this.getRequest();
    return axios.create({
      baseURL: options.baseURL,
      timeout: options.timeout,
      headers: options.headers,
      method: options.method,
      params: options.params,
    });
  }
}

module.exports = Axios;
