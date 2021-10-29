import React, { useEffect, useState } from "react";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

const EditPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.users.getById(userId).then((user) =>
      setUser({
        ...user,
        email: user.email ? user.email : "",
        sex: user.sex ? user.sex : "other",
        profession: user.profession._id,
        qualities: user.qualities.map((qual) => {
          return { label: qual.name, value: qual._id };
        }),
      })
    );
    api.professions.fetchAll().then((prof) => setProfessions(prof));
    api.qualities.fetchAll().then((qual) => setQualities(qual));
  }, []);

  const getProfessionById = (professionId) => {
    for (const prof in professions) {
      if (professions[prof]._id === professionId) {
        return professions[prof];
      }
    }
  };

  const getQualitiesById = (userQualities) => {
    const newQualities = [];
    for (const qualUser of userQualities) {
      for (const qual in qualities) {
        if (qualUser.value === qualities[qual]._id) {
          newQualities.push(qualities[qual]);
        }
      }
    }
    return newQualities;
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
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
    },
  };

  useEffect(() => {
    validate();
  }, [user]);

  const validate = () => {
    const errors = validator(user, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange = (target) => {
    console.log(target.name, target.value);
    setUser((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.users
      .update(userId, {
        ...user,
        profession: getProfessionById(user.profession),
        qualities: getQualitiesById(user.qualities),
      })
      .then((user) => history.push(`/users/${user._id}`));
  };

  const clickBack = () => {
    history.push(`/users/${user._id}`)
  }

  const isValid = Object.keys(errors).length === 0;

  if (user) {
    return (
      <div className="container mt-5">
        <button className="btn btn-primary" onClick={clickBack}>Назад</button>
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-5">
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={user.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={user.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выберите свою профессию"
                value={user.profession}
                options={professions}
                onChange={handleChange}
                name="profission"
              />

              <RadioField
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" },
                ]}
                value={user.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите Ваш пол"
              />
              <MultiSelectField
                options={qualities}
                name="qualities"
                onChange={handleChange}
                label="Выберите Ваши качества"
                value={user.qualities}
              />
              <button
                disabled={!isValid}
                type="submit"
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return <h3>Loading...</h3>;
};
EditPage.propTypes = {
  userId: PropTypes.string,
};

export default EditPage;
