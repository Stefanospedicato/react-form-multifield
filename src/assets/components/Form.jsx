import { useEffect, useState } from "react";

const list = [];

const tags = [
  { id: 1, name: "Tecnologia" },
  { id: 2, name: "Scienza" },
  { id: 3, name: "Arte" },
  { id: 4, name: "Musica" },
  { id: 5, name: "Sport" },
  { id: 6, name: "Cucina" },
  { id: 7, name: "Viaggi" },
  { id: 8, name: "Letteratura" },
];

const defaultTask = {
  text: "",
  image: "",
  content: "",
  category: "",
  tags: [],
  published: false,
};

const Form = () => {
  const [myList, setMyList] = useState(list);
  const [newTask, setNewTask] = useState(defaultTask);

  useEffect(() => {
    if (newTask.published) {
      alert("Articolo pubblicato!");
    }
  }, [newTask.published]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    setMyList([...myList, { ...newTask, id: Date.now() }]);
    setNewTask(defaultTask);
  };

  const handlerNewTask = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlerRemove = (id) => {
    const newList = myList.filter((item) => item.id !== id);
    setMyList(newList);
  };

  return (
    <>
      <div className="container my-5">
        <form action="#" onSubmit={handlerSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control my-2"
              placeholder="Scrivi il titolo dell'articolo..."
              name="text"
              value={newTask.text}
              onChange={handlerNewTask}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control my-2"
              placeholder="URL immagine..."
              name="image"
              value={newTask.image}
              onChange={handlerNewTask}
            />
          </div>
          <div className="input-group">
            <textarea
              className="form-control my-2"
              placeholder="Contenuto..."
              name="content"
              value={newTask.content}
              onChange={handlerNewTask}
            />
          </div>
          <div className="input-group">
            <select
              className="form-control my-2"
              name="category"
              value={newTask.category}
              onChange={handlerNewTask}
            >
              <option value="">Seleziona categoria...</option>
              <option value="Cronaca">Cronaca</option>
              <option value="Sport">Sport</option>
              <option value="Moda">Moda</option>
              <option value="Botanica">Botanica</option>
              <option value="Animali">Animali</option>
            </select>
          </div>
          <div className="input-group">
            {tags.map((tag) => (
              <label key={tag.id}>
                <input
                  type="checkbox"
                  name="tags"
                  className="m-3"
                  value={tag.id}
                  checked={newTask.tags.includes(tag.id)}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    setNewTask((prevTask) => ({
                      ...prevTask,
                      tags: checked
                        ? [...prevTask.tags, parseInt(value, 10)]
                        : prevTask.tags.filter(
                            (tag) => tag !== parseInt(value, 10)
                          ),
                    }));
                  }}
                />
                {tag.name}
              </label>
            ))}
          </div>
          <div className="input-group">
            <label>
              <input
                type="checkbox"
                name="published"
                className="m-3"
                checked={newTask.published}
                onChange={handlerNewTask}
              />
              Pubblicato
            </label>
          </div>
          <button className="btn btn-primary my-3" type="submit">
            Aggiungi
          </button>
        </form>
      </div>
      <div className="container">
        <ul className="list-group">
          {myList.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between"
            >
              <div className="flex-column">
                <h2>Titolo: {task.text}</h2>
                <div>Categoria: {task.category}</div>
                <div>Articolo: {task.content}</div>
                <div>Tags: {task.tags}</div>
                <div>
                  Immagine: <img src={task.image} alt="immagine articolo" />
                </div>
                <div>Pubblicato: {task.published ? "Si" : "No"} </div>
              </div>
              <i
                className="fa-solid fa-trash"
                onClick={() => handlerRemove(task.id)}
              ></i>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Form;
