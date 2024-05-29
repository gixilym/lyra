import useStorage from "../hooks/useStorage";
import { LANGS } from "./consts";

function userLanguage(enText: string, esText: string): string {
  const { getItem } = useStorage();
  const language: string = getItem("language") ?? LANGS.en;
  return language == LANGS.en ? enText : esText;
}

function translations() {
  const dictionary = {
    Archived: userLanguage("Paper Bin", "Papelera"),
    Font: userLanguage("Font", "Fuente"),
    About: userLanguage("About", "Acerca de"),
    Preferences: userLanguage("Preferences", "Preferencias"),
    File: userLanguage("File", "Archivo"),
    List: userLanguage("List", "Lista"),
    Search: userLanguage("Search", "Buscar"),
    CheckSpelling: userLanguage("Check spelling", "Revisar ortografía"),
    ReduceTextSize: userLanguage(
      "Reduce text size",
      "Reducir tamaño del texto"
    ),
    IncreaseTextSize: userLanguage(
      "Increase text size",
      "Aumentar tamaño del texto"
    ),
    SpellcheckerOff: userLanguage(
      "Spellchecker off",
      "Corrector ortográfico desactivado"
    ),
    SpellcheckerOn: userLanguage(
      "Spellchecker on",
      "Corrector ortográfico activado"
    ),
    GoToTheListByPlacingTheCursorHere: userLanguage(
      "go to the list by placing the cursor here",
      "accede a la lista colocando el cursor aquí"
    ),
    ContactThisEmailForQuestions: userLanguage(
      "Contact this email for questions about lyra",
      "Contacta este correo para preguntas sobre lyra"
    ),

    FullScreen: userLanguage("Full screen", "Pantalla completa"),
    Updates: userLanguage("Updates", "Actualizaciones"),
    EmailCopied: userLanguage("Email copied", "Email copiado"),
    Version: userLanguage("version", "versión"),
    DevelopedBy: userLanguage("developed by gixi", "desarrollado por gixi"),
    Start: userLanguage("Start", "Iniciar"),
    LocalSaved: userLanguage("local saved", "guardado local"),
    OfflineAccess: userLanguage("offline access", "acceso sin conexión"),
    MinimalDesing: userLanguage("minimal design", "diseño minimalista"),
    FocusedWriting: userLanguage("focused writing", "escritura enfocada"),
    CenterText: userLanguage("Center text", "Centrar texto"),
    AddYourFirstAnnotation: userLanguage(
      "Add your first record",
      "Agrega tu primer registro"
    ),
    InvalidName: userLanguage("Invalid name", "Nombre inválido"),
    NameAlreadyExists: userLanguage(
      "Name already exists",
      "El nombre ya existe"
    ),
    Move: userLanguage("Move", "Mover"),
    AreYouSure: userLanguage("Are you sure?", "¿Estás seguro?"),
    NoSpecialCharacters: userLanguage(
      "No special characters allowed",
      "No se permiten caracteres especiales"
    ),
    VeryLongName: userLanguage(
      "Very long name",
      "El nombre es demasiado extenso"
    ),
    WordCount: userLanguage("Word count", "Contar palabras"),
    Enabled: userLanguage("Enabled", "Activado"),
    Disabled: userLanguage("Disabled", "Desactivado"),
    Word: userLanguage("word", "palabra"),
    Words: userLanguage("words", "palabras"),
    EditedName: userLanguage("Edited name", "Nombre editado"),
    Cancel: userLanguage("Cancel", "Cancelar"),
    Change: userLanguage("Change", "Cambiar"),
    EnterNewName: userLanguage("Enter new name", "Ingrese el nuevo nombre"),
    Help: userLanguage("Help", "Ayuda"),
    Commands: userLanguage("Commands", "Comandos"),
    Backup: userLanguage("Backup", "Copia de seguridad"),
    Language: userLanguage("Language", "Idioma"),
    Themes: userLanguage("Themes", "Temas"),
    Support: userLanguage("Support", "Soporte"),
    ClearNight: userLanguage("Clear night", "Noche clara"),
    DarkNight: userLanguage("Dark night", "Noche oscura"),
    SunnyDay: userLanguage("Sunny day", "Día soleado"),
    AddNewItem: userLanguage("Add a record", "Nuevo registro"),
    EnterName: userLanguage("Enter name", "Ingresa un nombre"),
    RepeatedItem: userLanguage("Repeated name", "Nombre repetido"),
    DeletedFile: userLanguage("Deleted record", "Registro eliminado"),
    MoveToTrash: userLanguage(
      "Do you want to move this record to the paper bin?",
      "¿Quieres mover este registro a la papelera?"
    ),
    SentToTrash: userLanguage("Sent to the paper bin", "Enviado a la papelera"),
    NothingHere: userLanguage("Nothing here...", "Nada por aquí..."),

    Loading: userLanguage("Loading...", "Cargando..."),
    RestoreQuestion: userLanguage(
      "Do you want to restore this record?",
      "¿Deseas restaurar este registro?"
    ),
    DeleteQuestion: userLanguage(
      "Do you want to remove this record?",
      "¿Deseas eliminar este registro?"
    ),
    Delete: userLanguage("Delete", "Eliminar"),
    Recover: userLanguage("Recover", "Recuperar"),
    FileRecovered: userLanguage("Record recovered", "Registro recuperado"),
  };

  return dictionary;
}

export default translations;
