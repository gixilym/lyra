import useStorage from "../hooks/useStorage";
import { LANGS } from "./consts";

function userLanguage(enText: string, esText: string): string {
  const { getItem } = useStorage();
  const language: string = getItem("language") ?? LANGS.en;
  return language == LANGS.en ? enText : esText;
}

function translations() {
  const dictionary = {
    LastBackupCreatedAt: userLanguage(
      "Last backup created at",
      "Ultima copia de seguridad creada el"
    ),
    ResetPreferences: userLanguage(
      "Reset preferences",
      "Restablecer preferencias"
    ),
    Suggestions: userLanguage("Suggestions", "Sugerencias"),
    SuggestionsText: userLanguage(
      "Your suggestions help us improve. If you have ideas or improvements that you would like to see in lyra soon, feel free to send them.",
      "Tus sugerencias nos ayudan a mejorar. Si tienes ideas o mejoras que te gustaría ver en lyra pronto, no dudes en enviarlas."
    ),
    Errors: userLanguage("Errors", "Errores"),
    ErrorsText: userLanguage(
      "If you find a bug in the app, please provide a detailed description of the problem, steps to reproduce it, and any screenshots that may help.",
      "Si encuentras un error en la aplicación, por favor proporciona una descripción detallada del problema, pasos para reproducirlo y cualquier captura de pantalla que pueda ayudar."
    ),
    Creating: userLanguage("creating...", "creando..."),
    CreateBackup: userLanguage("create backup", "crear copia de seguridad"),
    CopyCreated: userLanguage("copy created", "copia creada"),
    ImportBackup: userLanguage("import backup", "importar copia de seguridad"),
    Import: userLanguage("Import", "Importar"),
    ImportRecords: userLanguage("Import records", "Importar registros"),
    YouWantToDeleteAllFiles: userLanguage(
      "You want to delete all files from the paper bin?",
      "¿Deseas eliminar todos los registros de la papelera?"
    ),
    YouWantToRestoreAllFiles: userLanguage(
      "You want to restore all records from the paper bin?",
      "¿Deseas restaurar todos los registros de la papelera?"
    ),
    IfYouWantToImportFiles: userLanguage(
      "If you want to import '.txt' files, you need to go to 'C:\\Users\\your-user\\Documents\\lyra' and place them inside 'lyra'.",
      "Si deseas importar archivos '.txt', debes dirigirte a 'C:\\Users\\tu-usuario\\Documents\\lyra' y colocarlos dentro 'lyra'."
    ),
    IfYouWantToImportBackup: userLanguage(
      "If you want to import a backup, you must go to 'C:\\Users\\your-user\\Documents', look for the 'lyra-backup' folder and change the name to 'lyra'.",
      "Si deseas importar una copia de seguridad, debes dirigirte a 'C:\\Users\\tu-usuario\\Documents' buscar la carpeta 'lyra-backup' y modificar el nombre por 'lyra'."
    ),
    InfoAboutBackup: userLanguage(
      "Only files that are NOT in the trash will be backed up, if you want to back up the trash you will have to do it manually.",
      "Solo se respaldarán los archivos que NO estén en la papelera, en caso que desees respaldar la papelera deberás realizarlo manualmente."
    ),
    TheBackupIsIn: userLanguage(
      "The backup is in",
      "La copia de seguridad se encuentra en"
    ),
    YourUser: userLanguage("your-user", "tu-usuario"),
    Important: userLanguage("Important", "Importante"),
    RecoverEverything: userLanguage("Recover everything", "Recuperar todo"),
    RecoveryRecords: userLanguage("Recovery records", "Registros recuperados"),
    DeleteEverything: userLanguage("Delete everything", "Eliminar todo"),
    DeletedRecords: userLanguage("Deleted records", "Registros eliminados"),
    LastModified: userLanguage("Last modified", "Última modificación"),
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
    TextOpacity: userLanguage("Text opacity", "Opacidad del texto"),
    LetterSpacing: userLanguage("Letter spacing", "Espacio entre letras"),
    TestText: userLanguage("Test Text", "Texto de Prueba"),
    TestParagraph: userLanguage(
      " In a small village surrounded by mountains, there lived a young man named Emiliano, known for his ability to tell magical stories. One day, while exploring an old nearby forest, he found an ancient book covered in dust and moss. Upon opening it, he discovered that it contained tales about a mysterious lost kingdom that only revealed itself to those with a pure heart and a mind open to imagination. ",
      "En una pequeña aldea rodeada de montañas, vivía un joven llamado Emiliano, conocido por su habilidad para contar historias mágicas. Un día, mientras exploraba un viejo bosque cercano, encontró un antiguo libro cubierto de polvo y musgo. Al abrirlo, descubrió que contenía relatos sobre un misterioso reino perdido que solo se revelaba a aquellos con un corazón puro y una mente abierta a la imaginación."
    ),
    FullScreen: userLanguage("Full screen", "Pantalla completa"),
    Updates: userLanguage("Updates", "Actualizaciones"),
    Version: userLanguage("version", "versión"),
    DevelopedBy: userLanguage("developed by gixi", "desarrollado por gixi"),
    Start: userLanguage("Start", "Iniciar"),
    LocalSaved: userLanguage("local saved", "guardado local"),
    OfflineAccess: userLanguage("offline access", "acceso sin conexión"),
    MinimalDesing: userLanguage("minimal design", "diseño minimalista"),
    FocusedWriting: userLanguage("focused writing", "escritura enfocada"),
    AlternateText: userLanguage("Alternate text", "Alternar texto"),
    On: userLanguage("on", "del"),
    Modified: userLanguage("Modified", "Modificado"),
    CopiedToClipboard: userLanguage(
      "Copied to clipboard",
      "Copiado al portapapeles"
    ),
    CopyText: userLanguage("Copy text", "Copiar texto"),
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
