import React, { useEffect, useState } from "react";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";

const EditPage = ({ userId }) => {
  const [data, setData] = useState({
    email: "",
    profession: "",
    sex: "male",
    qualities: [],
  });
  const [user, setUser] = useState();
  const [qualities, setQualities] = useState({});
  const [professions, setProfessions] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен не корректно",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
      isCapital: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру",
      },
      min: {
        message: "Пароль должен содержать минимум 8 символов",
        value: 8,
      },
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите вашу профессию",
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
     api.users.update(userId, data)
    console.log(data);
  };

  if (user) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <h3 className="mb-4">{user.name}</h3>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выберите вашу профессию"
                onChange={handleChange}
                options={professions}
                defaultOption="Choose..."
                error={errors.profession}
                value={data.profession}
                name="profession"
              />
              <RadioField
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" },
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите Ваш пол"
              />
              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Выберите Ваши качества"
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading</h1>
  }
};
EditPage.propTypes = {
  userId: PropTypes.string,
};

export default EditPage;
