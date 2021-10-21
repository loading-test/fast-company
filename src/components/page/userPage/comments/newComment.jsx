import React from "react";
import SelectField from "../../../common/form/selectField";

const NewComment = ({ users, onChange }) => {
  // const [users, setUsers] = useState();

  // useEffect(() => {
  //   api.users.fetchAll().then((data) => setUsers(data));
  // }, []);

  // const handleChange = (target) => {
  //   console.log(target.name, target.value);
  //   setUsers((prevState) => ({
  //     ...prevState,
  //     [target.name]: target.value,
  //   }));
  // };

  return (
    <div className="card mb-3">
      <div className="card-body ">
        <h2>New comment</h2>
        <SelectField
          defaultOption="Выберите пользователя"
          options={users}
          onChange={onChange}
        />
        <label htmlFor="textaria">Сообщение</label>
        <div className="form-floating ">
          <textarea
            className="form-control "
            id="floatingTextarea2"
            rows="3"
          ></textarea>
         
        </div>
        <div className="text-end">
        <button className="btn btn-primary mt-3">Опубликовать</button>
        </div>
      </div>
    </div>
  );
};

export default NewComment;
