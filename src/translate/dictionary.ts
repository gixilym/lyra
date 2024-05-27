import useStorage from "../hooks/useStorage";
import { LANGS } from "../utils/consts";

function userLanguage(enText: string, esText: string): string {
  const { getItem } = useStorage();
  const language: string = getItem("language") ?? LANGS.en;
  return language == LANGS.en ? enText : esText;
}

function translations() {
  const dictionary = {
    Font: userLanguage("Font", "Fuente"),
    Configuration: userLanguage("Configuration", "Configuración"),
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
      "Contactar este correo para preguntas sobre lyra"
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
      "Add your first annotation",
      "Agrega tu primer anotación"
    ),
    InvalidName: userLanguage("Invalid name", "Nombre inválido"),
    NameAlreadyExists: userLanguage(
      "Name already exists",
      "El nombre ya existe"
    ),
    Move: userLanguage("Move", "Mover"),
    AreYouSure: userLanguage("Are you sure?", "¿Estas seguro?"),

    EditedName: userLanguage("Edited name", "Nombre editado"),
    Cancel: userLanguage("Cancel", "Cancelar"),
    Change: userLanguage("Change", "Cambiar"),
    EnterNewName: userLanguage("Enter new name", "Ingrese el nuevo nombre"),
    Help: userLanguage("Help", "Ayuda"),
    Commands: userLanguage("Commands", "Comandos"),
    Backup: userLanguage("Backup", "Copia de seguridad"),
    Language: userLanguage("Language", "Idioma"),
    Themes: userLanguage("Themes", "Temas"),
    Contact: userLanguage("Contact", "Contacto"),
    ClearNight: userLanguage("Clear night", "Noche clara"),
    DarkNight: userLanguage("Dark night", "Noche oscura"),
    SunnyDay: userLanguage("Sunny day", "Día soleado"),
    AddNewItem: userLanguage("Add annotation", "Nueva anotación"),
    EnterName: userLanguage("Enter name", "Debes ingresar un nombre"),
    RepeatedItem: userLanguage("Repeated name", "Nombre repetido"),
    DeletedFile: userLanguage("Deleted file", "Archivo eliminado"),
    WantDelete: userLanguage("You want to delete", "Quieres eliminar"),
    MoveToTrash: userLanguage(
      "Do you want move this file to the trash?",
      "¿Quieres mover este archivo a la papelera?"
    ),
    SentToTrash: userLanguage("Sent to trash", "Movido a la papelera"),
    NothingHere: userLanguage("Nothing here...", "Nada por aquí..."),

    Loading: userLanguage("Loading...", "Cargando..."),
    RestoreQuestion: userLanguage(
      "Do you want restore this file?",
      "¿Deseas restaurar este archivo?"
    ),
    DeleteQuestion: userLanguage(
      "Do you want remove this file?",
      "¿Deseas eliminar este archivo?"
    ),
    Delete: userLanguage("Delete", "Eliminar"),
    Recover: userLanguage("Recover", "Recuperar"),
    FileRecovered: userLanguage("File recovered", "Archivo recuperado"),
  };

  return dictionary;
}

export default translations;
