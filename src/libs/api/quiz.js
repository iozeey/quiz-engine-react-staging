import { getBaseApiUrl } from "./../env";
import BaseAPI from "./baseAPI";
const getExerciseid = window.location.pathname.split("/")[3];
   
const getQuizUrl = (quiz_id) => `${getBaseApiUrl()}/quiz/${quiz_id}/?id=${getExerciseid}`;

class API extends BaseAPI {
  constructor(props) {
    super(props);
    this.props = props;
  }

  get = ({ id }) => {
    return this.fetchSecure({ url: getQuizUrl(id) });
  };

  post = ({ id, data }) => {
    return this.postSecure({ url: getQuizUrl(id), data });
  };
}

export default new API();
