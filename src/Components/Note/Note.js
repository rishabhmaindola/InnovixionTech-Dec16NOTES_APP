import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdDelete } from "react-icons/md";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import "./Note.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ["link", "image", "video"],
  ]
}

let timer = 500,
  timeout;

function Note(props) {
  const [value, setValue] = useState('');
  

  useEffect(() => {
    setValue(props.note.text);
  }, [props.note.text]);

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);
    const monthNames = [
      "Jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    let hrs = date.getHours() % 12 || 12;
    let amPm = date.getHours() >= 12 ? "PM" : "AM";
    let min = date.getMinutes().toString().padStart(2, "0");
    let day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${hrs}:${min} ${amPm} ${day} ${month}`;
  };

  const debounce = (func) => {
    clearTimeout(timeout);
    timeout = setTimeout(func, timer);
  };

  const handleTextChange = (text) => {
    setValue(text);
    debounce(() => props.updateText(text, props.note.id));
  };

  return (
    <div className="note" style={{ backgroundColor: props.note.color }}>
      <div className="note_body">
        <ReactQuill
          theme="bubble"
          value={value}
          onChange={handleTextChange}
          modules={modules}
          className='quill-toolbar custom-scroll'
        />
      </div>
      <div className="note_footer">
        <p>{formatDate(props.note.time)}</p>
        <motion.button
          whileHover={{ scale: 1.3 }}
          onHoverStart={e => { }}
          onHoverEnd={e => { }}
          onClick={() => props.deleteNote(props.note.id)} >
          <MdDelete />
        </motion.button>
      </div>
    </div>
  );
}

export default Note;
