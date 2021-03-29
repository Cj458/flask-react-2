import { useEffect, useState } from 'react';
import uuid from "react-uuid";
import './App.css';
import Main from './Main';
import Sidebar from './Sidebar';

function App() {
  const[notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.notes) : []);
  
  const [activeNote, setActiveNote] = useState(false);

//modified hereeeeeeee
  //useEffect(() => {
   // fetch('/api').then(response=> {
     // if(response.ok){
      //  return response.json()
    //  }
  //  }).then(notes => setNotes(notes) )
//  }, []);


  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

   const onDeleteNote = (idTodelete) => {
      setNotes(notes.filter((note) => note.id !== idTodelete))
  };

  const getActiveNote = () =>{
    return notes.find((note) => note.id === activeNote);
  }

  return (
    <div className="App">

      <Sidebar 
      notes={notes} 
      onAddNote={onAddNote} 
      onDeleteNote={onDeleteNote}
      activeNote={activeNote}
      setActiveNote={setActiveNote}

      //added code for: this prop is supposed to load Data from the data base
      //but for some reason th data base can't be created...from the terminal/note=Note(id, title, body, latestModified )
     // listOfNotes={notes}
     />

      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
