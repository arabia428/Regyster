/* ========== REGYSTER - TODO EL CÓDIGO JAVASCRIPT ========== */
  // Registrar Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(err => {
        console.log('SW error:', err);
      });
    });
  }

  // ========== SISTEMA DE IDIOMAS / LANGUAGE SYSTEM ==========
  const translations = {
    es: {
      // Navegación
      nav_home: "Inicio",
      nav_charts: "Gráficas",
      nav_upcoming: "Próximo",
      nav_settings: "Ajustes",

      // Página Principal
      date: "Fecha",
      night_hours_auto: "Horas Nocturnas (automático)",
      diet_overnight: "Dieta Pernocta",
      at_home: "En casa",
      in_truck: "En camión",
      holiday: "Festivo",
      sixth_day: "Sexto día consecutivo",
      start_work: "INICIAR TRABAJO",
      stop: "PARAR",
      save: "GUARDAR",
      delete_records: "BORRAR REGISTROS",
      press_to_start: "Presiona para comenzar",
      working_since: "Trabajando desde",
      resting_since: "Descansando desde",
      no_previous_records: "Sin registros previos",

      // Resúmenes
      summaries: "RESÚMENES",
      normal_summary: "Resumen Normal (Mes Completo)",
      show_monthly_summary: "Mostrar Resumen Mensual",
      calendar_26_25: "Calendario 26→25 (Ciclo Laboral)",
      show_calendar_26_25: "Mostrar Calendario 26→25",
      daily_summary: "Resumen Diario",
      show_daily_summaries: "Mostrar Resúmenes Diarios",

      // Gráficas
      charts: "GRÁFICAS",
      week: "Semana",
      month: "Mes",
      year: "Año",
      all: "Todo",
      work_hours: "Horas de Trabajo",
      rest_hours: "Horas de Descanso",
      total_hours: "Total Horas",
      average_day: "Promedio/Día",
      days_worked: "Días Trabajados",
      days_rest: "Días Descanso",

      // Próximamente
      coming_soon: "Próximamente...",
      coming_soon_msg: "Esta página está reservada para futuras funcionalidades épicas que aún no se me han ocurrido.",
      coming_soon_msg2: "Cuando la inspiración golpee como un rayo en mitad de la noche (o en un descanso del camión), aquí aparecerá algo increíble.",
      coming_soon_sarcastic: "De momento, disfruta del vacío existencial de esta página. Es minimalismo llevado al extremo. Muy zen. Muy moderno. Básicamente, no hay nada porque aún no me ha dado por añadir nada. Pero hey, ¡el icono flota! Eso cuenta como feature, ¿no?",

      // Ajustes
      settings: "Ajustes",
      customization: "Personalización",
      dark_mode: "Modo Oscuro",
      light_mode: "Claro",
      neon_effects: "Efectos Neón",
      animation_speed: "Velocidad Animaciones",
      normal: "Normales",
      fast: "Rápidas",
      slow: "Lentas",
      disabled: "Desactivadas",
      time_format: "Formato de Horas",
      traditional: "Tradicional (8h 30m 15s)",
      decimal: "Decimal (8.50h)",
      main_color: "Color principal",
      text_size: "Tamaño de texto",
      font: "Fuente",
      default_font: "Por defecto",
      apply_changes: "Aplicar Cambios",
      restore_defaults: "Restaurar Predeterminados",

      // Horarios y Ciclos
      schedules_cycles: "Horarios y Ciclos",
      night_start_hour: "Hora INICIO nocturnas",
      night_end_hour: "Hora FIN nocturnas",
      cycle_start_day: "Día inicio de ciclo laboral",
      cycle_info: "El ciclo laboral va desde el día seleccionado del mes anterior hasta el día anterior del mes actual.",

      // Importar/Exportar
      import_export: "Importar / Exportar Datos",
      import_from_file: "Importar datos desde archivo",
      select_json_file: "Seleccionar Archivo JSON",
      import_warning: "Esto reemplazará todos los datos actuales",
      select_month_export: "Seleccionar mes a exportar",
      export_month_json: "Exportar Mes JSON",
      export_all_json: "Exportar TODO JSON",
      export_month_pdf: "Exportar Mes PDF",
      export_all_pdf: "Exportar TODO PDF",

      // Notificaciones
      notifications_alerts: "Notificaciones y Alertas",
      vibrate_on_clock: "Vibrar al fichar",
      sound_on_clock: "Sonido al fichar",
      daily_limit_warning: "Aviso límite horas diarias",
      warning_exceed: "Avisar al superar:",
      hours: "horas",
      clock_reminder: "Recordatorio de fichaje",
      reminder_no_clock: "Recordar si no ficho después de:",
      minutes: "minutos",
      hour: "hora",
      reminder_info: "Recibirás un aviso si llevas mucho tiempo sin registrar actividad",

      // Borrar Datos
      delete_data: "Borrar Datos",
      delete_warning: "Esta acción es irreversible. Se eliminarán todos los registros guardados.",
      delete_all_data: "Borrar TODOS los Datos",
      clean_cache: "Limpiar Caché de la App",

      // Información
      information: "Información",
      version: "Versión 2.0",
      app_description: "Aplicación profesional para el control de jornadas laborales",
      work_rest_tracking: "Registro de trabajo y descanso",
      offline_pwa: "Funciona 100% offline • PWA",
      developed_with: "Desarrollado con",
      for_my_king: "Para Mi Rey",

      // Idioma
      language: "Idioma",
      select_language: "Seleccionar idioma",

      // Modales
      last_10_records: "Últimos 10 Registros",
      no_records_show: "No hay registros para mostrar",
      worked: "trabajadas",
      chronometer_data: "${t('chronometer_data')}",
      work_session: "${t('work_session')}",
      start_time: "Hora de inicio",
      end_time: "Hora de fin",
      hours_worked: "Horas trabajadas",
      night_hours: "Horas nocturnas",
      total_worked: "TOTAL TRABAJADAS",
      rest_session: "${t('rest_session')}",
      hours_rested: "Horas descansadas",
      total_rested: "TOTAL DESCANSADAS",
      manual_data: "${t('manual_data')}",

      // Calendario
      days_worked_cal: "Días Trabajados",
      days_rest_cal: "Días de Descanso",

      // Meses
      january: "Enero",
      february: "Febrero",
      march: "Marzo",
      april: "Abril",
      may: "Mayo",
      june: "Junio",
      july: "Julio",
      august: "Agosto",
      september: "Septiembre",
      october: "Octubre",
      november: "Noviembre",
      december: "Diciembre",

      // Días de la semana
      mon: "LUN",
      tue: "MAR",
      wed: "MIÉ",
      thu: "JUE",
      fri: "VIE",
      sat: "SÁB",
      sun: "DOM",

      // Alertas y mensajes
      select_date: "Selecciona fecha",
      saved_successfully: "Guardado correctamente",
      check_to_confirm: "Marca el checkbox para confirmar el borrado",
      confirm_delete: "¿Seguro que quieres borrar este registro?",
      record_deleted: "Registro borrado correctamente",
      select_month: "Selecciona mes",
      records_found: "Registros encontrados",
      festive_days: "Días festivos",
      sixth_days: "Sextos días",
      days_in_truck: "Días en camión",
      days_at_home: "Días en casa",
      summary: "Resumen",

      // Edición de sesiones
      work_sessions: "Sesiones de Trabajo",
      rest_sessions: "Descansos (automático)",
      no_work_sessions: "No hay sesiones de trabajo registradas",
      rest_auto_calculated: "El descanso se calcula automáticamente entre sesiones de trabajo",
      add_work_session: "Añadir ${t('work_session')}",
      new_work_session: "Nueva ${t('work_session')}",
      session: "Sesión",
      rest: "Descanso",
      duration: "Duración",
      start: "Inicio",
      end: "Fin",

      // Exportación PDF
      generating_pdf: "Generando PDF...",
      pdf_generated: "PDF generado correctamente",
      error_generating_pdf: "Error al generar el PDF",
      no_data_export: "No hay datos para exportar en el período seleccionado",

      // Límite de horas
      attention: "¡ATENCIÓN!",
      hours_limit_exceeded: "Has superado el límite de",
      daily_hours: "horas diarias",
      hours_worked_today: "Horas trabajadas hoy:",
      remember_rest: "¡Recuerda descansar!",

      // Confirmaciones
      confirm_delete_all: "¿Estás seguro de que quieres borrar TODOS los datos? Esta acción no se puede deshacer.",
      all_data_deleted: "Todos los datos han sido borrados",
      cache_cleaned: "Caché limpiada correctamente",
      confirm_clean_cache: "¿Limpiar la caché de la aplicación? La app se recargará.",

      // Importar datos
      select_file_import: "Selecciona un archivo JSON para importar",
      import_successful: "Datos importados correctamente",
      import_error: "Error al importar datos. Verifica que el archivo sea válido.",

      // Personalización aplicada
      customization_applied: "Personalización aplicada",
      defaults_restored: "Valores predeterminados restaurados"
    },

    en: {
      // Navigation
      nav_home: "Home",
      nav_charts: "Charts",
      nav_upcoming: "Upcoming",
      nav_settings: "Settings",

      // Main Page
      date: "Date",
      night_hours_auto: "Night Hours (automatic)",
      diet_overnight: "Overnight Allowance",
      at_home: "At home",
      in_truck: "In truck",
      holiday: "Holiday",
      sixth_day: "Sixth consecutive day",
      start_work: "START WORK",
      stop: "STOP",
      save: "SAVE",
      delete_records: "DELETE RECORDS",
      press_to_start: "Press to start",
      working_since: "Working since",
      resting_since: "Resting since",
      no_previous_records: "No previous records",

      // Summaries
      summaries: "SUMMARIES",
      normal_summary: "Normal Summary (Full Month)",
      show_monthly_summary: "Show Monthly Summary",
      calendar_26_25: "Calendar 26→25 (Work Cycle)",
      show_calendar_26_25: "Show Calendar 26→25",
      daily_summary: "Daily Summary",
      show_daily_summaries: "Show Daily Summaries",

      // Charts
      charts: "CHARTS",
      week: "Week",
      month: "Month",
      year: "Year",
      all: "All",
      work_hours: "Work Hours",
      rest_hours: "Rest Hours",
      total_hours: "Total Hours",
      average_day: "Average/Day",
      days_worked: "Days Worked",
      days_rest: "Rest Days",

      // Coming Soon
      coming_soon: "Coming Soon...",
      coming_soon_msg: "This page is reserved for future epic features that haven't been thought of yet.",
      coming_soon_msg2: "When inspiration strikes like lightning in the middle of the night (or during a truck break), something amazing will appear here.",
      coming_soon_sarcastic: "For now, enjoy the existential void of this page. It's minimalism taken to the extreme. Very zen. Very modern. Basically, there's nothing because I haven't gotten around to adding anything yet. But hey, the icon floats! That counts as a feature, right?",

      // Settings
      settings: "Settings",
      customization: "Customization",
      dark_mode: "Dark Mode",
      light_mode: "Light",
      neon_effects: "Neon Effects",
      animation_speed: "Animation Speed",
      normal: "Normal",
      fast: "Fast",
      slow: "Slow",
      disabled: "Disabled",
      time_format: "Time Format",
      traditional: "Traditional (8h 30m 15s)",
      decimal: "Decimal (8.50h)",
      main_color: "Main color",
      text_size: "Text size",
      font: "Font",
      default_font: "Default",
      apply_changes: "Apply Changes",
      restore_defaults: "Restore Defaults",

      // Schedules and Cycles
      schedules_cycles: "Schedules and Cycles",
      night_start_hour: "Night START hour",
      night_end_hour: "Night END hour",
      cycle_start_day: "Work cycle start day",
      cycle_info: "The work cycle goes from the selected day of the previous month to the day before the current month.",

      // Import/Export
      import_export: "Import / Export Data",
      import_from_file: "Import data from file",
      select_json_file: "Select JSON File",
      import_warning: "This will replace all current data",
      select_month_export: "Select month to export",
      export_month_json: "Export Month JSON",
      export_all_json: "Export ALL JSON",
      export_month_pdf: "Export Month PDF",
      export_all_pdf: "Export ALL PDF",

      // Notifications
      notifications_alerts: "Notifications and Alerts",
      vibrate_on_clock: "Vibrate on clock-in",
      sound_on_clock: "Sound on clock-in",
      daily_limit_warning: "Daily hour limit warning",
      warning_exceed: "Warn when exceeding:",
      hours: "hours",
      clock_reminder: "Clock-in reminder",
      reminder_no_clock: "Remind if no clock-in after:",
      minutes: "minutes",
      hour: "hour",
      reminder_info: "You'll receive a warning if you go too long without logging activity",

      // Delete Data
      delete_data: "Delete Data",
      delete_warning: "This action is irreversible. All saved records will be deleted.",
      delete_all_data: "Delete ALL Data",
      clean_cache: "Clean App Cache",

      // Information
      information: "Information",
      version: "Version 2.0",
      app_description: "Professional application for work time tracking",
      work_rest_tracking: "Work and rest tracking",
      offline_pwa: "Works 100% offline • PWA",
      developed_with: "Developed with",
      for_my_king: "For My King",

      // Language
      language: "Language",
      select_language: "Select language",

      // Modals
      last_10_records: "Last 10 Records",
      no_records_show: "No records to show",
      worked: "worked",
      chronometer_data: "Chronometer Data",
      work_session: "Work Session",
      start_time: "Start time",
      end_time: "End time",
      hours_worked: "Hours worked",
      night_hours: "Night hours",
      total_worked: "TOTAL WORKED",
      rest_session: "Rest Session",
      hours_rested: "Hours rested",
      total_rested: "TOTAL RESTED",
      manual_data: "Manual Data",

      // Calendar
      days_worked_cal: "Days Worked",
      days_rest_cal: "Rest Days",

      // Months
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December",

      // Days of week
      mon: "MON",
      tue: "TUE",
      wed: "WED",
      thu: "THU",
      fri: "FRI",
      sat: "SAT",
      sun: "SUN",

      // Alerts and messages
      select_date: "Select date",
      saved_successfully: "Saved successfully",
      check_to_confirm: "Check the checkbox to confirm deletion",
      confirm_delete: "Are you sure you want to delete this record?",
      record_deleted: "Record deleted successfully",
      select_month: "Select month",
      records_found: "Records found",
      festive_days: "Holidays",
      sixth_days: "Sixth days",
      days_in_truck: "Days in truck",
      days_at_home: "Days at home",
      summary: "Summary",

      // Session editing
      work_sessions: "Work Sessions",
      rest_sessions: "Rests (automatic)",
      no_work_sessions: "No work sessions recorded",
      rest_auto_calculated: "Rest is automatically calculated between work sessions",
      add_work_session: "Add Work Session",
      new_work_session: "New Work Session",
      session: "Session",
      rest: "Rest",
      duration: "Duration",
      start: "Start",
      end: "End",

      // PDF Export
      generating_pdf: "Generating PDF...",
      pdf_generated: "PDF generated successfully",
      error_generating_pdf: "Error generating PDF",
      no_data_export: "No data to export in the selected period",

      // Hour limit
      attention: "ATTENTION!",
      hours_limit_exceeded: "You've exceeded the limit of",
      daily_hours: "daily hours",
      hours_worked_today: "Hours worked today:",
      remember_rest: "Remember to rest!",

      // Confirmations
      confirm_delete_all: "Are you sure you want to delete ALL data? This action cannot be undone.",
      all_data_deleted: "All data has been deleted",
      cache_cleaned: "Cache cleaned successfully",
      confirm_clean_cache: "Clean app cache? The app will reload.",

      // Import data
      select_file_import: "Select a JSON file to import",
      import_successful: "Data imported successfully",
      import_error: "Error importing data. Verify the file is valid.",

      // Customization applied
      customization_applied: "Customization applied",
      defaults_restored: "Defaults restored"
    },

    ru: {
      // Навигация
      nav_home: "Главная",
      nav_charts: "Графики",
      nav_upcoming: "Скоро",
      nav_settings: "Настройки",

      // Главная страница
      date: "Дата",
      night_hours_auto: "Ночные часы (автоматически)",
      diet_overnight: "Суточные",
      at_home: "Дома",
      in_truck: "В грузовике",
      holiday: "Праздник",
      sixth_day: "Шестой день подряд",
      start_work: "НАЧАТЬ РАБОТУ",
      stop: "СТОП",
      save: "СОХРАНИТЬ",
      delete_records: "УДАЛИТЬ ЗАПИСИ",
      press_to_start: "Нажмите для начала",
      working_since: "Работает с",
      resting_since: "Отдыхает с",
      no_previous_records: "Нет предыдущих записей",

      // Сводки
      summaries: "СВОДКИ",
      normal_summary: "Обычная сводка (полный месяц)",
      show_monthly_summary: "Показать месячную сводку",
      calendar_26_25: "Календарь 26→25 (рабочий цикл)",
      show_calendar_26_25: "Показать календарь 26→25",
      daily_summary: "Ежедневная сводка",
      show_daily_summaries: "Показать ежедневные сводки",

      // Графики
      charts: "ГРАФИКИ",
      week: "Неделя",
      month: "Месяц",
      year: "Год",
      all: "Все",
      work_hours: "Рабочие часы",
      rest_hours: "Часы отдыха",
      total_hours: "Всего часов",
      average_day: "Среднее/День",
      days_worked: "Рабочие дни",
      days_rest: "Дни отдыха",

      // Скоро
      coming_soon: "Скоро...",
      coming_soon_msg: "Эта страница зарезервирована для будущих эпических функций, которые еще не придуманы.",
      coming_soon_msg2: "Когда вдохновение ударит как молния посреди ночи (или во время перерыва на грузовике), здесь появится что-то невероятное.",
      coming_soon_sarcastic: "А пока наслаждайтесь экзистенциальной пустотой этой страницы. Это минимализм, доведенный до крайности. Очень дзен. Очень современно. В основном здесь ничего нет, потому что я еще не добрался до добавления чего-либо. Но эй, иконка плавает! Это считается функцией, верно?",

      // Настройки
      settings: "Настройки",
      customization: "Персонализация",
      dark_mode: "Темный режим",
      light_mode: "Светлый",
      neon_effects: "Неоновые эффекты",
      animation_speed: "Скорость анимации",
      normal: "Нормальная",
      fast: "Быстрая",
      slow: "Медленная",
      disabled: "Отключено",
      time_format: "Формат времени",
      traditional: "Традиционный (8ч 30м 15с)",
      decimal: "Десятичный (8.50ч)",
      main_color: "Основной цвет",
      text_size: "Размер текста",
      font: "Шрифт",
      default_font: "По умолчанию",
      apply_changes: "Применить изменения",
      restore_defaults: "Восстановить по умолчанию",

      // Расписание и циклы
      schedules_cycles: "Расписание и циклы",
      night_start_hour: "Час НАЧАЛА ночи",
      night_end_hour: "Час ОКОНЧАНИЯ ночи",
      cycle_start_day: "День начала рабочего цикла",
      cycle_info: "Рабочий цикл идет с выбранного дня предыдущего месяца до дня перед текущим месяцем.",

      // Импорт/Экспорт
      import_export: "Импорт / Экспорт данных",
      import_from_file: "Импортировать данные из файла",
      select_json_file: "Выбрать JSON файл",
      import_warning: "Это заменит все текущие данные",
      select_month_export: "Выбрать месяц для экспорта",
      export_month_json: "Экспорт месяца JSON",
      export_all_json: "Экспорт ВСЕХ JSON",
      export_month_pdf: "Экспорт месяца PDF",
      export_all_pdf: "Экспорт ВСЕХ PDF",

      // Уведомления
      notifications_alerts: "Уведомления и оповещения",
      vibrate_on_clock: "Вибрация при отметке",
      sound_on_clock: "Звук при отметке",
      daily_limit_warning: "Предупреждение о дневном лимите часов",
      warning_exceed: "Предупреждать при превышении:",
      hours: "часов",
      clock_reminder: "Напоминание об отметке",
      reminder_no_clock: "Напомнить, если нет отметки после:",
      minutes: "минут",
      hour: "час",
      reminder_info: "Вы получите предупреждение, если слишком долго не регистрируете активность",

      // Удаление данных
      delete_data: "Удалить данные",
      delete_warning: "Это действие необратимо. Все сохраненные записи будут удалены.",
      delete_all_data: "Удалить ВСЕ данные",
      clean_cache: "Очистить кэш приложения",

      // Информация
      information: "Информация",
      version: "Версия 2.0",
      app_description: "Профессиональное приложение для контроля рабочего времени",
      work_rest_tracking: "Учет работы и отдыха",
      offline_pwa: "Работает 100% оффлайн • PWA",
      developed_with: "Разработано с",
      for_my_king: "Для моего короля",

      // Язык
      language: "Язык",
      select_language: "Выбрать язык",

      // Модальные окна
      last_10_records: "Последние 10 записей",
      no_records_show: "Нет записей для отображения",
      worked: "отработано",
      chronometer_data: "Данные хронометра",
      work_session: "Рабочая сессия",
      start_time: "Время начала",
      end_time: "Время окончания",
      hours_worked: "Отработанные часы",
      night_hours: "Ночные часы",
      total_worked: "ВСЕГО ОТРАБОТАНО",
      rest_session: "Сессия отдыха",
      hours_rested: "Часы отдыха",
      total_rested: "ВСЕГО ОТДЫХА",
      manual_data: "Ручные данные",

      // Календарь
      days_worked_cal: "Рабочие дни",
      days_rest_cal: "Дни отдыха",

      // Месяцы
      january: "Январь",
      february: "Февраль",
      march: "Март",
      april: "Апрель",
      may: "Май",
      june: "Июнь",
      july: "Июль",
      august: "Август",
      september: "Сентябрь",
      october: "Октябрь",
      november: "Ноябрь",
      december: "Декабрь",

      // Дни недели
      mon: "ПН",
      tue: "ВТ",
      wed: "СР",
      thu: "ЧТ",
      fri: "ПТ",
      sat: "СБ",
      sun: "ВС",

      // Оповещения и сообщения
      select_date: "Выберите дату",
      saved_successfully: "Сохранено успешно",
      check_to_confirm: "Установите флажок для подтверждения удаления",
      confirm_delete: "Вы уверены, что хотите удалить эту запись?",
      record_deleted: "Запись успешно удалена",
      select_month: "Выберите месяц",
      records_found: "Найдено записей",
      festive_days: "Праздничные дни",
      sixth_days: "Шестые дни",
      days_in_truck: "Дней в грузовике",
      days_at_home: "Дней дома",
      summary: "Сводка",

      // Редактирование сессий
      work_sessions: "Рабочие сессии",
      rest_sessions: "Отдых (автоматически)",
      no_work_sessions: "Нет записанных рабочих сессий",
      rest_auto_calculated: "Отдых рассчитывается автоматически между рабочими сессиями",
      add_work_session: "Добавить рабочую сессию",
      new_work_session: "Новая рабочая сессия",
      session: "Сессия",
      rest: "Отдых",
      duration: "Продолжительность",
      start: "Начало",
      end: "Конец",

      // Экспорт PDF
      generating_pdf: "Генерация PDF...",
      pdf_generated: "PDF успешно создан",
      error_generating_pdf: "Ошибка при создании PDF",
      no_data_export: "Нет данных для экспорта в выбранном периоде",

      // Лимит часов
      attention: "ВНИМАНИЕ!",
      hours_limit_exceeded: "Вы превысили лимит",
      daily_hours: "часов в день",
      hours_worked_today: "Часов отработано сегодня:",
      remember_rest: "Не забудьте отдохнуть!",

      // Подтверждения
      confirm_delete_all: "Вы уверены, что хотите удалить ВСЕ данные? Это действие нельзя отменить.",
      all_data_deleted: "Все данные были удалены",
      cache_cleaned: "Кэш успешно очищен",
      confirm_clean_cache: "Очистить кэш приложения? Приложение перезагрузится.",

      // Импорт данных
      select_file_import: "Выберите JSON файл для импорта",
      import_successful: "Данные успешно импортированы",
      import_error: "Ошибка импорта данных. Проверьте, что файл действителен.",

      // Применена персонализация
      customization_applied: "Персонализация применена",
      defaults_restored: "Настройки по умолчанию восстановлены"
    },

    zh: {
      // 导航
      nav_home: "主页",
      nav_charts: "图表",
      nav_upcoming: "即将推出",
      nav_settings: "设置",

      // 主页
      date: "日期",
      night_hours_auto: "夜间时数（自动）",
      diet_overnight: "过夜津贴",
      at_home: "在家",
      in_truck: "在卡车",
      holiday: "假期",
      sixth_day: "连续第六天",
      start_work: "开始工作",
      stop: "停止",
      save: "保存",
      delete_records: "删除记录",
      press_to_start: "按下开始",
      working_since: "工作开始时间",
      resting_since: "休息开始时间",
      no_previous_records: "无先前记录",

      // 摘要
      summaries: "摘要",
      normal_summary: "正常摘要（整月）",
      show_monthly_summary: "显示月度摘要",
      calendar_26_25: "日历 26→25（工作周期）",
      show_calendar_26_25: "显示日历 26→25",
      daily_summary: "每日摘要",
      show_daily_summaries: "显示每日摘要",

      // 图表
      charts: "图表",
      week: "周",
      month: "月",
      year: "年",
      all: "全部",
      work_hours: "工作时数",
      rest_hours: "休息时数",
      total_hours: "总时数",
      average_day: "每日平均",
      days_worked: "工作天数",
      days_rest: "休息天数",

      // 即将推出
      coming_soon: "即将推出...",
      coming_soon_msg: "此页面保留用于尚未想到的未来史诗功能。",
      coming_soon_msg2: "当灵感像午夜闪电一样袭来（或在卡车休息期间），这里将出现令人惊叹的东西。",
      coming_soon_sarcastic: "目前，请享受这个页面的存在主义虚空。这是极端的极简主义。非常禅宗。非常现代。基本上，这里什么都没有，因为我还没有添加任何东西。但是嘿，图标会漂浮！这算作一个功能，对吧？",

      // 设置
      settings: "设置",
      customization: "个性化",
      dark_mode: "深色模式",
      light_mode: "浅色",
      neon_effects: "霓虹效果",
      animation_speed: "动画速度",
      normal: "正常",
      fast: "快速",
      slow: "慢速",
      disabled: "禁用",
      time_format: "时间格式",
      traditional: "传统（8小时30分15秒）",
      decimal: "十进制（8.50小时）",
      main_color: "主要颜色",
      text_size: "文字大小",
      font: "字体",
      default_font: "默认",
      apply_changes: "应用更改",
      restore_defaults: "恢复默认值",

      // 时间表和周期
      schedules_cycles: "时间表和周期",
      night_start_hour: "夜间开始时间",
      night_end_hour: "夜间结束时间",
      cycle_start_day: "工作周期开始日",
      cycle_info: "工作周期从上个月选定的日期到当月前一天。",

      // 导入/导出
      import_export: "导入/导出数据",
      import_from_file: "从文件导入数据",
      select_json_file: "选择JSON文件",
      import_warning: "这将替换所有当前数据",
      select_month_export: "选择要导出的月份",
      export_month_json: "导出月份JSON",
      export_all_json: "导出全部JSON",
      export_month_pdf: "导出月份PDF",
      export_all_pdf: "导出全部PDF",

      // 通知
      notifications_alerts: "通知和警报",
      vibrate_on_clock: "打卡时振动",
      sound_on_clock: "打卡时声音",
      daily_limit_warning: "每日小时限制警告",
      warning_exceed: "超过时警告：",
      hours: "小时",
      clock_reminder: "打卡提醒",
      reminder_no_clock: "如果在以下时间后未打卡则提醒：",
      minutes: "分钟",
      hour: "小时",
      reminder_info: "如果您太长时间没有记录活动，您将收到警告",

      // 删除数据
      delete_data: "删除数据",
      delete_warning: "此操作不可逆。将删除所有保存的记录。",
      delete_all_data: "删除所有数据",
      clean_cache: "清除应用缓存",

      // 信息
      information: "信息",
      version: "版本 2.0",
      app_description: "专业的工作时间跟踪应用程序",
      work_rest_tracking: "工作和休息跟踪",
      offline_pwa: "100%离线工作 • PWA",
      developed_with: "开发使用",
      for_my_king: "献给我的国王",

      // 语言
      language: "语言",
      select_language: "选择语言",

      // 模态框
      last_10_records: "最近10条记录",
      no_records_show: "无记录显示",
      worked: "已工作",
      chronometer_data: "计时器数据",
      work_session: "工作时段",
      start_time: "开始时间",
      end_time: "结束时间",
      hours_worked: "工作时数",
      night_hours: "夜间时数",
      total_worked: "总工作时数",
      rest_session: "休息时段",
      hours_rested: "休息时数",
      total_rested: "总休息时数",
      manual_data: "手动数据",

      // 日历
      days_worked_cal: "工作天数",
      days_rest_cal: "休息天数",

      // 月份
      january: "一月",
      february: "二月",
      march: "三月",
      april: "四月",
      may: "五月",
      june: "六月",
      july: "七月",
      august: "八月",
      september: "九月",
      october: "十月",
      november: "十一月",
      december: "十二月",

      // 星期
      mon: "周一",
      tue: "周二",
      wed: "周三",
      thu: "周四",
      fri: "周五",
      sat: "周六",
      sun: "周日",

      // 警报和消息
      select_date: "选择日期",
      saved_successfully: "保存成功",
      check_to_confirm: "勾选复选框以确认删除",
      confirm_delete: "您确定要删除此记录吗？",
      record_deleted: "记录已成功删除",
      select_month: "选择月份",
      records_found: "找到的记录",
      festive_days: "假期天数",
      sixth_days: "第六天",
      days_in_truck: "卡车天数",
      days_at_home: "在家天数",
      summary: "摘要",

      // 会话编辑
      work_sessions: "工作时段",
      rest_sessions: "休息（自动）",
      no_work_sessions: "无记录的工作时段",
      rest_auto_calculated: "休息时间在工作时段之间自动计算",
      add_work_session: "添加工作时段",
      new_work_session: "新工作时段",
      session: "时段",
      rest: "休息",
      duration: "持续时间",
      start: "开始",
      end: "结束",

      // PDF导出
      generating_pdf: "正在生成PDF...",
      pdf_generated: "PDF生成成功",
      error_generating_pdf: "生成PDF时出错",
      no_data_export: "所选期间无数据可导出",

      // 小时限制
      attention: "注意！",
      hours_limit_exceeded: "您已超过限制",
      daily_hours: "每日小时",
      hours_worked_today: "今天工作时数：",
      remember_rest: "记得休息！",

      // 确认
      confirm_delete_all: "您确定要删除所有数据吗？此操作无法撤消。",
      all_data_deleted: "所有数据已被删除",
      cache_cleaned: "缓存已成功清除",
      confirm_clean_cache: "清除应用缓存？应用将重新加载。",

      // 导入数据
      select_file_import: "选择要导入的JSON文件",
      import_successful: "数据导入成功",
      import_error: "导入数据时出错。请验证文件有效。",

      // 应用个性化
      customization_applied: "个性化已应用",
      defaults_restored: "默认值已恢复"
    },

    de: {
      // Navigation
      nav_home: "Startseite",
      nav_charts: "Diagramme",
      nav_upcoming: "Demnächst",
      nav_settings: "Einstellungen",

      // Hauptseite
      date: "Datum",
      night_hours_auto: "Nachtstunden (automatisch)",
      diet_overnight: "Übernachtungszulage",
      at_home: "Zuhause",
      in_truck: "Im LKW",
      holiday: "Feiertag",
      sixth_day: "Sechster Tag in Folge",
      start_work: "ARBEIT BEGINNEN",
      stop: "STOPP",
      save: "SPEICHERN",
      delete_records: "DATENSÄTZE LÖSCHEN",
      press_to_start: "Zum Starten drücken",
      working_since: "Arbeitet seit",
      resting_since: "Ruht seit",
      no_previous_records: "Keine vorherigen Datensätze",

      // Zusammenfassungen
      summaries: "ZUSAMMENFASSUNGEN",
      normal_summary: "Normale Zusammenfassung (Ganzer Monat)",
      show_monthly_summary: "Monatliche Zusammenfassung anzeigen",
      calendar_26_25: "Kalender 26→25 (Arbeitszyklus)",
      show_calendar_26_25: "Kalender 26→25 anzeigen",
      daily_summary: "Tägliche Zusammenfassung",
      show_daily_summaries: "Tägliche Zusammenfassungen anzeigen",

      // Diagramme
      charts: "DIAGRAMME",
      week: "Woche",
      month: "Monat",
      year: "Jahr",
      all: "Alle",
      work_hours: "Arbeitsstunden",
      rest_hours: "Ruhestunden",
      total_hours: "Gesamtstunden",
      average_day: "Durchschnitt/Tag",
      days_worked: "Arbeitstage",
      days_rest: "Ruhetage",

      // Demnächst
      coming_soon: "Demnächst...",
      coming_soon_msg: "Diese Seite ist für zukünftige epische Funktionen reserviert, die noch nicht erdacht wurden.",
      coming_soon_msg2: "Wenn die Inspiration wie ein Blitz mitten in der Nacht einschlägt (oder während einer LKW-Pause), wird hier etwas Erstaunliches erscheinen.",
      coming_soon_sarcastic: "Genießen Sie vorerst die existenzielle Leere dieser Seite. Es ist Minimalismus bis zum Extrem. Sehr zen. Sehr modern. Im Grunde gibt es hier nichts, weil ich noch nichts hinzugefügt habe. Aber hey, das Symbol schwebt! Das zählt als Funktion, oder?",

      // Einstellungen
      settings: "Einstellungen",
      customization: "Anpassung",
      dark_mode: "Dunkler Modus",
      light_mode: "Hell",
      neon_effects: "Neon-Effekte",
      animation_speed: "Animationsgeschwindigkeit",
      normal: "Normal",
      fast: "Schnell",
      slow: "Langsam",
      disabled: "Deaktiviert",
      time_format: "Zeitformat",
      traditional: "Traditionell (8h 30m 15s)",
      decimal: "Dezimal (8.50h)",
      main_color: "Hauptfarbe",
      text_size: "Textgröße",
      font: "Schriftart",
      default_font: "Standard",
      apply_changes: "Änderungen übernehmen",
      restore_defaults: "Standardwerte wiederherstellen",

      // Zeitpläne und Zyklen
      schedules_cycles: "Zeitpläne und Zyklen",
      night_start_hour: "Nacht-START-Stunde",
      night_end_hour: "Nacht-END-Stunde",
      cycle_start_day: "Arbeitszyklus-Starttag",
      cycle_info: "Der Arbeitszyklus geht vom ausgewählten Tag des vorherigen Monats bis zum Tag vor dem aktuellen Monat.",

      // Import/Export
      import_export: "Daten importieren/exportieren",
      import_from_file: "Daten aus Datei importieren",
      select_json_file: "JSON-Datei auswählen",
      import_warning: "Dies ersetzt alle aktuellen Daten",
      select_month_export: "Monat zum Exportieren auswählen",
      export_month_json: "Monat JSON exportieren",
      export_all_json: "ALLE JSON exportieren",
      export_month_pdf: "Monat PDF exportieren",
      export_all_pdf: "ALLE PDF exportieren",

      // Benachrichtigungen
      notifications_alerts: "Benachrichtigungen und Warnungen",
      vibrate_on_clock: "Bei Zeiterfassung vibrieren",
      sound_on_clock: "Bei Zeiterfassung Ton",
      daily_limit_warning: "Warnung bei täglichem Stundenlimit",
      warning_exceed: "Warnen bei Überschreitung:",
      hours: "Stunden",
      clock_reminder: "Zeiterfassungserinnerung",
      reminder_no_clock: "Erinnern, wenn keine Zeiterfassung nach:",
      minutes: "Minuten",
      hour: "Stunde",
      reminder_info: "Sie erhalten eine Warnung, wenn Sie zu lange keine Aktivität aufzeichnen",

      // Daten löschen
      delete_data: "Daten löschen",
      delete_warning: "Diese Aktion ist irreversibel. Alle gespeicherten Datensätze werden gelöscht.",
      delete_all_data: "ALLE Daten löschen",
      clean_cache: "App-Cache leeren",

      // Information
      information: "Information",
      version: "Version 2.0",
      app_description: "Professionelle Anwendung zur Arbeitszeiterfassung",
      work_rest_tracking: "Arbeits- und Ruhezeit-Tracking",
      offline_pwa: "Funktioniert 100% offline • PWA",
      developed_with: "Entwickelt mit",
      for_my_king: "Für meinen König",

      // Sprache
      language: "Sprache",
      select_language: "Sprache auswählen",

      // Modale Fenster
      last_10_records: "Letzte 10 Datensätze",
      no_records_show: "Keine Datensätze zum Anzeigen",
      worked: "gearbeitet",
      chronometer_data: "Stoppuhr-Daten",
      work_session: "Arbeitssitzung",
      start_time: "Startzeit",
      end_time: "Endzeit",
      hours_worked: "Arbeitsstunden",
      night_hours: "Nachtstunden",
      total_worked: "INSGESAMT GEARBEITET",
      rest_session: "Ruhesitzung",
      hours_rested: "Ruhestunden",
      total_rested: "INSGESAMT GERUHT",
      manual_data: "Manuelle Daten",

      // Kalender
      days_worked_cal: "Arbeitstage",
      days_rest_cal: "Ruhetage",

      // Monate
      january: "Januar",
      february: "Februar",
      march: "März",
      april: "April",
      may: "Mai",
      june: "Juni",
      july: "Juli",
      august: "August",
      september: "September",
      october: "Oktober",
      november: "November",
      december: "Dezember",

      // Wochentage
      mon: "MO",
      tue: "DI",
      wed: "MI",
      thu: "DO",
      fri: "FR",
      sat: "SA",
      sun: "SO",

      // Warnungen und Nachrichten
      select_date: "Datum auswählen",
      saved_successfully: "Erfolgreich gespeichert",
      check_to_confirm: "Kontrollkästchen zum Bestätigen des Löschvorgangs aktivieren",
      confirm_delete: "Sind Sie sicher, dass Sie diesen Datensatz löschen möchten?",
      record_deleted: "Datensatz erfolgreich gelöscht",
      select_month: "Monat auswählen",
      records_found: "Gefundene Datensätze",
      festive_days: "Feiertage",
      sixth_days: "Sechste Tage",
      days_in_truck: "Tage im LKW",
      days_at_home: "Tage zu Hause",
      summary: "Zusammenfassung",

      // Sitzungsbearbeitung
      work_sessions: "Arbeitssitzungen",
      rest_sessions: "Ruhepausen (automatisch)",
      no_work_sessions: "Keine Arbeitssitzungen aufgezeichnet",
      rest_auto_calculated: "Ruhezeit wird automatisch zwischen Arbeitssitzungen berechnet",
      add_work_session: "Arbeitssitzung hinzufügen",
      new_work_session: "Neue Arbeitssitzung",
      session: "Sitzung",
      rest: "Ruhe",
      duration: "Dauer",
      start: "Start",
      end: "Ende",

      // PDF-Export
      generating_pdf: "PDF wird erstellt...",
      pdf_generated: "PDF erfolgreich erstellt",
      error_generating_pdf: "Fehler beim Erstellen des PDF",
      no_data_export: "Keine Daten zum Exportieren im ausgewählten Zeitraum",

      // Stundenlimit
      attention: "ACHTUNG!",
      hours_limit_exceeded: "Sie haben das Limit von",
      daily_hours: "Stunden pro Tag überschritten",
      hours_worked_today: "Heute gearbeitete Stunden:",
      remember_rest: "Denken Sie daran, sich auszuruhen!",

      // Bestätigungen
      confirm_delete_all: "Sind Sie sicher, dass Sie ALLE Daten löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.",
      all_data_deleted: "Alle Daten wurden gelöscht",
      cache_cleaned: "Cache erfolgreich geleert",
      confirm_clean_cache: "App-Cache leeren? Die App wird neu geladen.",

      // Daten importieren
      select_file_import: "Wählen Sie eine JSON-Datei zum Importieren aus",
      import_successful: "Daten erfolgreich importiert",
      import_error: "Fehler beim Importieren von Daten. Überprüfen Sie, ob die Datei gültig ist.",

      // Anpassung angewendet
      customization_applied: "Anpassung angewendet",
      defaults_restored: "Standardwerte wiederhergestellt"
    },

    pl: {
      // Nawigacja
      nav_home: "Start",
      nav_charts: "Wykresy",
      nav_upcoming: "Wkrótce",
      nav_settings: "Ustawienia",

      // Strona główna
      date: "Data",
      night_hours_auto: "Godziny nocne (automatycznie)",
      diet_overnight: "Dieta noclegowa",
      at_home: "W domu",
      in_truck: "W ciężarówce",
      holiday: "Święto",
      sixth_day: "Szósty dzień z rzędu",
      start_work: "ROZPOCZNIJ PRACĘ",
      stop: "STOP",
      save: "ZAPISZ",
      delete_records: "USUŃ REKORDY",
      press_to_start: "Naciśnij, aby rozpocząć",
      working_since: "Pracuje od",
      resting_since: "Odpoczywa od",
      no_previous_records: "Brak poprzednich rekordów",

      // Podsumowania
      summaries: "PODSUMOWANIA",
      normal_summary: "Normalne podsumowanie (pełny miesiąc)",
      show_monthly_summary: "Pokaż podsumowanie miesięczne",
      calendar_26_25: "Kalendarz 26→25 (cykl pracy)",
      show_calendar_26_25: "Pokaż kalendarz 26→25",
      daily_summary: "Podsumowanie dzienne",
      show_daily_summaries: "Pokaż podsumowania dzienne",

      // Wykresy
      charts: "WYKRESY",
      week: "Tydzień",
      month: "Miesiąc",
      year: "Rok",
      all: "Wszystko",
      work_hours: "Godziny pracy",
      rest_hours: "Godziny odpoczynku",
      total_hours: "Łącznie godzin",
      average_day: "Średnia/Dzień",
      days_worked: "Dni robocze",
      days_rest: "Dni odpoczynku",

      // Wkrótce
      coming_soon: "Wkrótce...",
      coming_soon_msg: "Ta strona jest zarezerwowana dla przyszłych epickich funkcji, które jeszcze nie zostały wymyślone.",
      coming_soon_msg2: "Kiedy inspiracja uderzy jak piorun w środku nocy (lub podczas przerwy w ciężarówce), pojawi się tu coś niesamowitego.",
      coming_soon_sarcastic: "Na razie ciesz się egzystencjalną pustką tej strony. To minimalizm doprowadzony do ekstremum. Bardzo zen. Bardzo nowoczesne. W zasadzie nie ma tu nic, bo jeszcze nic nie dodałem. Ale hej, ikona unosi się! To się liczy jako funkcja, prawda?",

      // Ustawienia
      settings: "Ustawienia",
      customization: "Personalizacja",
      dark_mode: "Tryb ciemny",
      light_mode: "Jasny",
      neon_effects: "Efekty neonowe",
      animation_speed: "Prędkość animacji",
      normal: "Normalna",
      fast: "Szybka",
      slow: "Wolna",
      disabled: "Wyłączona",
      time_format: "Format czasu",
      traditional: "Tradycyjny (8h 30m 15s)",
      decimal: "Dziesiętny (8.50h)",
      main_color: "Kolor główny",
      text_size: "Rozmiar tekstu",
      font: "Czcionka",
      default_font: "Domyślna",
      apply_changes: "Zastosuj zmiany",
      restore_defaults: "Przywróć domyślne",

      // Harmonogramy i cykle
      schedules_cycles: "Harmonogramy i cykle",
      night_start_hour: "Godzina ROZPOCZĘCIA nocy",
      night_end_hour: "Godzina ZAKOŃCZENIA nocy",
      cycle_start_day: "Dzień rozpoczęcia cyklu pracy",
      cycle_info: "Cykl pracy trwa od wybranego dnia poprzedniego miesiąca do dnia przed bieżącym miesiącem.",

      // Import/Eksport
      import_export: "Import / Eksport danych",
      import_from_file: "Importuj dane z pliku",
      select_json_file: "Wybierz plik JSON",
      import_warning: "To zastąpi wszystkie bieżące dane",
      select_month_export: "Wybierz miesiąc do eksportu",
      export_month_json: "Eksportuj miesiąc JSON",
      export_all_json: "Eksportuj WSZYSTKO JSON",
      export_month_pdf: "Eksportuj miesiąc PDF",
      export_all_pdf: "Eksportuj WSZYSTKO PDF",

      // Powiadomienia
      notifications_alerts: "Powiadomienia i alerty",
      vibrate_on_clock: "Wibruj przy rejestracji",
      sound_on_clock: "Dźwięk przy rejestracji",
      daily_limit_warning: "Ostrzeżenie o dziennym limicie godzin",
      warning_exceed: "Ostrzegaj przy przekroczeniu:",
      hours: "godzin",
      clock_reminder: "Przypomnienie o rejestracji",
      reminder_no_clock: "Przypomnij, jeśli brak rejestracji po:",
      minutes: "minut",
      hour: "godzina",
      reminder_info: "Otrzymasz ostrzeżenie, jeśli zbyt długo nie zarejestrujesz aktywności",

      // Usuń dane
      delete_data: "Usuń dane",
      delete_warning: "Ta akcja jest nieodwracalna. Wszystkie zapisane rekordy zostaną usunięte.",
      delete_all_data: "Usuń WSZYSTKIE dane",
      clean_cache: "Wyczyść pamięć podręczną aplikacji",

      // Informacje
      information: "Informacje",
      version: "Wersja 2.0",
      app_description: "Profesjonalna aplikacja do śledzenia czasu pracy",
      work_rest_tracking: "Śledzenie pracy i odpoczynku",
      offline_pwa: "Działa 100% offline • PWA",
      developed_with: "Opracowane z",
      for_my_king: "Dla mojego króla",

      // Język
      language: "Język",
      select_language: "Wybierz język",

      // Okna modalne
      last_10_records: "Ostatnie 10 rekordów",
      no_records_show: "Brak rekordów do wyświetlenia",
      worked: "przepracowane",
      chronometer_data: "Dane stopera",
      work_session: "Sesja pracy",
      start_time: "Czas rozpoczęcia",
      end_time: "Czas zakończenia",
      hours_worked: "Godziny przepracowane",
      night_hours: "Godziny nocne",
      total_worked: "ŁĄCZNIE PRZEPRACOWANE",
      rest_session: "Sesja odpoczynku",
      hours_rested: "Godziny odpoczynku",
      total_rested: "ŁĄCZNIE ODPOCZYNEK",
      manual_data: "Dane ręczne",

      // Kalendarz
      days_worked_cal: "Dni robocze",
      days_rest_cal: "Dni odpoczynku",

      // Miesiące
      january: "Styczeń",
      february: "Luty",
      march: "Marzec",
      april: "Kwiecień",
      may: "Maj",
      june: "Czerwiec",
      july: "Lipiec",
      august: "Sierpień",
      september: "Wrzesień",
      october: "Październik",
      november: "Listopad",
      december: "Grudzień",

      // Dni tygodnia
      mon: "PON",
      tue: "WT",
      wed: "ŚR",
      thu: "CZW",
      fri: "PT",
      sat: "SOB",
      sun: "NIE",

      // Alerty i wiadomości
      select_date: "Wybierz datę",
      saved_successfully: "Zapisano pomyślnie",
      check_to_confirm: "Zaznacz pole wyboru, aby potwierdzić usunięcie",
      confirm_delete: "Czy na pewno chcesz usunąć ten rekord?",
      record_deleted: "Rekord usunięty pomyślnie",
      select_month: "Wybierz miesiąc",
      records_found: "Znaleziono rekordów",
      festive_days: "Święta",
      sixth_days: "Szóste dni",
      days_in_truck: "Dni w ciężarówce",
      days_at_home: "Dni w domu",
      summary: "Podsumowanie",

      // Edycja sesji
      work_sessions: "Sesje pracy",
      rest_sessions: "Odpoczynek (automatycznie)",
      no_work_sessions: "Brak zarejestrowanych sesji pracy",
      rest_auto_calculated: "Odpoczynek jest automatycznie obliczany między sesjami pracy",
      add_work_session: "Dodaj sesję pracy",
      new_work_session: "Nowa sesja pracy",
      session: "Sesja",
      rest: "Odpoczynek",
      duration: "Czas trwania",
      start: "Start",
      end: "Koniec",

      // Eksport PDF
      generating_pdf: "Generowanie PDF...",
      pdf_generated: "PDF wygenerowany pomyślnie",
      error_generating_pdf: "Błąd podczas generowania PDF",
      no_data_export: "Brak danych do eksportu w wybranym okresie",

      // Limit godzin
      attention: "UWAGA!",
      hours_limit_exceeded: "Przekroczyłeś limit",
      daily_hours: "godzin dziennie",
      hours_worked_today: "Godzin przepracowanych dzisiaj:",
      remember_rest: "Pamiętaj o odpoczynku!",

      // Potwierdzenia
      confirm_delete_all: "Czy na pewno chcesz usunąć WSZYSTKIE dane? Tej akcji nie można cofnąć.",
      all_data_deleted: "Wszystkie dane zostały usunięte",
      cache_cleaned: "Pamięć podręczna wyczyszczona pomyślnie",
      confirm_clean_cache: "Wyczyścić pamięć podręczną aplikacji? Aplikacja zostanie przeładowana.",

      // Import danych
      select_file_import: "Wybierz plik JSON do importu",
      import_successful: "Dane zaimportowane pomyślnie",
      import_error: "Błąd podczas importowania danych. Sprawdź, czy plik jest prawidłowy.",

      // Zastosowano personalizację
      customization_applied: "Zastosowano personalizację",
      defaults_restored: "Przywrócono domyślne"
    }
  };

  // Idioma actual (se carga desde localStorage o español por defecto)
  let currentLang = localStorage.getItem('language') || 'es';

  // Función para obtener una traducción
  function t(key) {
    return translations[currentLang][key] || translations['es'][key] || key;
  }

  // Función para cambiar idioma
  function changeLanguage(lang) {
    if (!translations[lang]) {
      console.error('Idioma no soportado:', lang);
      return;
    }

    currentLang = lang;
    localStorage.setItem('language', lang);

    // Actualizar atributo lang del HTML
    document.documentElement.lang = lang;

    // Aplicar traducciones
    applyTranslations();

    // Actualizar cronómetro para que use el idioma correcto
    actualizarReloj();

    // Recargar gráficas si estamos en esa página
    const paginaGraficas = document.getElementById('paginaGraficas');
    if (paginaGraficas && paginaGraficas.classList.contains('active')) {
      const periodoActivo = document.querySelector('.periodo-btn.active');
      if (periodoActivo) {
        cargarGraficas(periodoActivo.dataset.periodo);
      }
    }
  }

  // Función para aplicar todas las traducciones al DOM
  // ========== SISTEMA DE TRADUCCIÓN AUTOMÁTICO ==========
  // Esta función simple reemplaza 285 líneas de código manual
  function applyTranslations() {
    // Traducir todos los elementos con data-i18n automáticamente
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key && translations[currentLang] && translations[currentLang][key]) {
        element.textContent = translations[currentLang][key];
      }
    });

    // Traducir elementos con data-i18n-template (requieren formato especial)
    document.querySelectorAll('[data-i18n-template]').forEach(element => {
      const key = element.getAttribute('data-i18n-template');
      if (key === 'dark_mode_light_mode') {
        element.textContent = `🌙 ${t('dark_mode')} / ☀️ ${t('light_mode')}`;
      }
      if (key === 'font_default') {
        element.textContent = `Segoe UI (${t('default_font')})`;
      }
    });

    // Elementos dinámicos que cambian según el estado
    const botonCrono = document.getElementById('botonCrono');
    if (botonCrono) {
      if (cronometroTrabajando) {
        botonCrono.textContent = `⏹ ${t('stop')}`;
      } else {
        botonCrono.textContent = `▶ ${t('start_work')}`;
      }
    }

    // Traducir opciones de selects dinámicos
    const limiteHorasSelect = document.getElementById('limiteHorasDiarias');
    if (limiteHorasSelect && limiteHorasSelect.options) {
      for (let i = 0; i < limiteHorasSelect.options.length; i++) {
        const option = limiteHorasSelect.options[i];
        const horas = option.value;
        option.textContent = `${horas} ${t('hours')}`;
      }
    }

    const tiempoRecordatorioSelect = document.getElementById('tiempoRecordatorio');
    if (tiempoRecordatorioSelect && tiempoRecordatorioSelect.options) {
      tiempoRecordatorioSelect.options[0].textContent = `30 ${t('minutes')}`;
      tiempoRecordatorioSelect.options[1].textContent = `1 ${t('hour')}`;
      tiempoRecordatorioSelect.options[2].textContent = `2 ${t('hours')}`;
      tiempoRecordatorioSelect.options[3].textContent = `3 ${t('hours')}`;
    }

    console.log('✅ Traducciones aplicadas para idioma:', currentLang);
  }

  // Inicializar idioma al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    // Establecer el idioma guardado en el selector
    const selectorIdioma = document.getElementById('selectorIdioma');
    if (selectorIdioma) {
      selectorIdioma.value = currentLang;
    }

    // Aplicar traducciones iniciales
    applyTranslations();
  });

  // Función para calcular horas nocturnas (configurable)
  function calcularHorasNocturnas(timestampInicio, timestampFin){
    const HORA_INICIO_NOCTURNA = parseInt(localStorage.getItem('horaInicioNocturnas') || '22');
    const HORA_FIN_NOCTURNA = parseInt(localStorage.getItem('horaFinNocturnas') || '6');
    
    let horasNocturnas = 0;
    
    // Crear fechas desde los timestamps
    let inicio = new Date(timestampInicio);
    let fin = new Date(timestampFin);
    
    // Iterar minuto a minuto para mayor precisión
    let actual = new Date(inicio);
    
    while(actual < fin){
      const hora = actual.getHours();
      
      // Es nocturno si es >= 22:00 OR < 06:00
      if(hora >= HORA_INICIO_NOCTURNA || hora < HORA_FIN_NOCTURNA){
        horasNocturnas += 1/60; // Sumar 1 minuto en formato de hora
      }
      
      // Avanzar 1 minuto
      actual.setMinutes(actual.getMinutes() + 1);
    }
    
    return Math.round(horasNocturnas * 100) / 100; // Redondear a 2 decimales
  }

  // Función para obtener las horas nocturnas del día actual
  function obtenerHorasNocturnasDia(fecha){
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    const registrosDelDia = registrosCrono.filter(r => r.fecha === fecha && r.tipo === 'trabajo');
    
    let totalNocturnas = 0;
    registrosDelDia.forEach(r => {
      if(r.horasNocturnas !== undefined){
        totalNocturnas += r.horasNocturnas;
      }
    });
    
    return Math.round(totalNocturnas * 100) / 100;
  }

  // Actualizar display de horas nocturnas
  function actualizarDisplayNocturnas(){
    const fecha = document.getElementById('fecha').value || new Date().toISOString().split('T')[0];
    const horasNocturnas = obtenerHorasNocturnasDia(fecha);
    document.getElementById('nocturnasValor').textContent = formatearHorasDecimal(horasNocturnas);
  }

  // Actualizar cuando cambia la fecha
  document.getElementById('fecha').addEventListener('change', actualizarDisplayNocturnas);

  // Variables del cronómetro
  let cronometroTrabajando = false; // true = trabajando, false = descansando
  let horaInicioTrabajo = null;
  let ultimoFinTrabajo = null; // Para calcular descanso

  // Variable para formato de visualización del cronómetro (true = mostrar días, false = solo horas)
  let mostrarDiasEnCrono = localStorage.getItem('mostrarDiasEnCrono') !== 'false'; // Por defecto true

  // Recuperar estado del cronómetro al cargar la página
  function recuperarEstadoCrono(){
    const estadoGuardado = localStorage.getItem('estadoCrono');
    if(estadoGuardado){
      const estado = JSON.parse(estadoGuardado);
      cronometroTrabajando = estado.trabajando;
      horaInicioTrabajo = estado.horaInicioTrabajo;
      ultimoFinTrabajo = estado.ultimoFinTrabajo;
      
      if(cronometroTrabajando){
        document.getElementById('botonCrono').textContent = '⏹ PARAR';
      } else {
        document.getElementById('botonCrono').textContent = '▶ INICIAR TRABAJO';
      }
      actualizarReloj();
    } else {
      // Buscar el último fin de trabajo en los registros
      const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
      const trabajos = registrosCrono.filter(r => r.tipo === 'trabajo').sort((a, b) => b.timestampFin - a.timestampFin);
      if(trabajos.length > 0){
        ultimoFinTrabajo = trabajos[0].timestampFin;
        // Guardar estado para mostrar descanso
        localStorage.setItem('estadoCrono', JSON.stringify({
          trabajando: false,
          horaInicioTrabajo: null,
          ultimoFinTrabajo: ultimoFinTrabajo
        }));
      }
      actualizarReloj();
    }
  }

  function formatearTiempo(ms){
    const totalSegundos = Math.floor(ms / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;
    return `${String(horas).padStart(2,'0')}:${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}`;
  }

  function formatearTiempoLargo(ms, usarFormatoDias = true){
    const totalSegundos = Math.floor(ms / 1000);
    const dias = Math.floor(totalSegundos / 86400);

    if(usarFormatoDias && dias > 0){
      // Formato con días: "1d 7h 5m 34s"
      const horas = Math.floor((totalSegundos % 86400) / 3600);
      const minutos = Math.floor((totalSegundos % 3600) / 60);
      const segundos = totalSegundos % 60;
      return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    } else {
      // Formato solo horas totales: "31h 05m 34s"
      const horasTotales = Math.floor(totalSegundos / 3600);
      const minutos = Math.floor((totalSegundos % 3600) / 60);
      const segundos = totalSegundos % 60;
      return `${horasTotales}h ${String(minutos).padStart(2,'0')}m ${String(segundos).padStart(2,'0')}s`;
    }
  }

  // NUEVA FUNCIÓN: Convertir horas decimales a formato "Xh Ym Zs"
  function formatearHorasDecimal(horasDecimal){
    const totalSegundos = Math.round(horasDecimal * 3600);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;
    
    if(horas > 0){
      return `${horas}h ${minutos}m ${segundos}s`;
    } else if(minutos > 0){
      return `${minutos}m ${segundos}s`;
    } else {
      return `${segundos}s`;
    }
  }
  
  // Versión compacta sin segundos para estadísticas
  function formatearHorasCompacto(horasDecimal){
    const totalMinutos = Math.round(horasDecimal * 60);
    const horas = Math.floor(totalMinutos / 60);
    const minutos = totalMinutos % 60;
    
    if(horas > 0){
      return `${horas}h ${minutos}m`;
    } else {
      return `${minutos}m`;
    }
  }

  function formatearHora(timestamp){
    const fecha = new Date(timestamp);
    return fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  
  function formatearFechaHora(timestamp){
    const fecha = new Date(timestamp);
    return fecha.toLocaleString('es-ES', { 
      day: '2-digit', 
      month: '2-digit',
      hour: '2-digit', 
      minute: '2-digit'
    });
  }

  function actualizarReloj(){
    const tiempoReloj = document.getElementById('tiempoReloj');
    const iconoReloj = document.getElementById('iconoReloj');
    const estadoCrono = document.getElementById('estadoCrono');
    const reloj = document.getElementById('reloj');

    const ahora = Date.now();

    if(cronometroTrabajando && horaInicioTrabajo){
      // Mostrando trabajo en curso
      const total = ahora - horaInicioTrabajo;
      tiempoReloj.textContent = formatearTiempoLargo(total, mostrarDiasEnCrono);
      iconoReloj.textContent = '🔧';
      const horaInicioFormateada = formatearHora(horaInicioTrabajo);
      estadoCrono.textContent = `⏱️ ${t('working_since')} ${horaInicioFormateada}`;
      reloj.classList.add('activo');
    } else if(ultimoFinTrabajo){
      // Mostrando descanso en curso
      const total = ahora - ultimoFinTrabajo;
      tiempoReloj.textContent = formatearTiempoLargo(total, mostrarDiasEnCrono);
      iconoReloj.textContent = '🛏️';
      const finFormateado = formatearFechaHora(ultimoFinTrabajo);
      estadoCrono.textContent = `😴 ${t('resting_since')} ${finFormateado}`;
      reloj.classList.remove('activo');
    } else {
      // Sin datos previos
      tiempoReloj.textContent = '00:00:00';
      iconoReloj.textContent = '⏸️';
      estadoCrono.textContent = t('no_previous_records');
      reloj.classList.remove('activo');
    }

    requestAnimationFrame(actualizarReloj);
  }

  // Función para alternar formato de visualización del cronómetro
  function toggleFormatoCrono(){
    mostrarDiasEnCrono = !mostrarDiasEnCrono;
    localStorage.setItem('mostrarDiasEnCrono', mostrarDiasEnCrono);
    // El reloj se actualizará automáticamente en el siguiente frame de actualizarReloj()
  }

  document.getElementById('botonCrono').onclick = function(){
    const ahora = Date.now();
    const fechaActual = new Date(ahora);
    const fechaStr = fechaActual.toISOString().split('T')[0];

    if(!cronometroTrabajando){
      // INICIAR TRABAJO
      
      // Si había un descanso en curso, guardarlo
      if(ultimoFinTrabajo){
        const tiempoDescanso = (ahora - ultimoFinTrabajo) / 1000 / 3600;
        
        // Determinar la fecha del descanso (usamos la fecha de inicio del descanso)
        const fechaInicioDescanso = new Date(ultimoFinTrabajo);
        const fechaDescansoStr = fechaInicioDescanso.toISOString().split('T')[0];
        
        const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
        
        registrosCrono.push({
          fecha: fechaDescansoStr,
          tipo: 'descanso',
          tiempo: Math.round(tiempoDescanso * 100) / 100,
          timestamp: ahora,
          horaInicio: formatearHora(ultimoFinTrabajo),
          horaFin: formatearHora(ahora),
          timestampInicio: ultimoFinTrabajo,
          timestampFin: ahora
        });
        
        localStorage.setItem('registrosCrono', JSON.stringify(registrosCrono));
      }
      
      // Empezar trabajo
      cronometroTrabajando = true;
      horaInicioTrabajo = ahora;
      ultimoFinTrabajo = null;
      
      localStorage.setItem('estadoCrono', JSON.stringify({
        trabajando: true,
        horaInicioTrabajo: horaInicioTrabajo,
        ultimoFinTrabajo: null
      }));
      
      // Efectos al fichar
      efectosAlFichar();
      
      this.textContent = '⏹ PARAR';
      
    } else {
      // PARAR TRABAJO
      
      const tiempoTotal = (ahora - horaInicioTrabajo) / 1000 / 3600;
      const horasNocturnas = calcularHorasNocturnas(horaInicioTrabajo, ahora);
      
      // Determinar la fecha del trabajo (usamos la fecha de inicio)
      const fechaInicioTrabajo = new Date(horaInicioTrabajo);
      const fechaTrabajoStr = fechaInicioTrabajo.toISOString().split('T')[0];

      const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
      
      registrosCrono.push({
        fecha: fechaTrabajoStr,
        tipo: 'trabajo',
        tiempo: Math.round(tiempoTotal * 100) / 100,
        timestamp: ahora,
        horaInicio: formatearHora(horaInicioTrabajo),
        horaFin: formatearHora(ahora),
        timestampInicio: horaInicioTrabajo,
        timestampFin: ahora,
        horasNocturnas: horasNocturnas
      });
      
      localStorage.setItem('registrosCrono', JSON.stringify(registrosCrono));
      
      // Empezar descanso automáticamente
      cronometroTrabajando = false;
      ultimoFinTrabajo = ahora;
      horaInicioTrabajo = null;
      
      localStorage.setItem('estadoCrono', JSON.stringify({
        trabajando: false,
        horaInicioTrabajo: null,
        ultimoFinTrabajo: ultimoFinTrabajo
      }));
      
      // Actualizar display de horas nocturnas
      actualizarDisplayNocturnas();
      
      // Efectos al fichar
      efectosAlFichar();
      
      // Verificar límite de horas
      verificarLimiteHoras();
      
      this.textContent = '▶ INICIAR TRABAJO';
    }
  };

  function cargarHistorial(){
    const cont = document.getElementById('historial');
    cont.innerHTML = "";
    const data = JSON.parse(localStorage.getItem('registros') || "[]");
    if(data.length === 0){
      cont.innerHTML = "<div class='entry'>No hay registros aún.</div>";
      return;
    }
    data.forEach(r => {
      const div = document.createElement('div');
      div.className = 'entry';
      div.innerHTML = `<b style="color: #ff8c42;">Fecha:</b> ${r.fecha}<br>
         <b style="color: #ff8c42;">Nocturnas:</b> ${r.nocturnas}h<br>
         <b style="color: #ff8c42;">Dieta:</b> ${r.dieta_pernocta}<br>
         <b style="color: #ff8c42;">Festivo:</b> ${r.festivo ? 'Sí' : 'No'}<br>
         <b style="color: #ff8c42;">Sexto:</b> ${r.sexto ? 'Sí' : 'No'}`;
      cont.appendChild(div);
    });
  }

  document.getElementById('botonGuardar').onclick = () => {
    const fecha = document.getElementById('fecha').value;
    const dieta = document.getElementById('dieta_pernocta').value;
    const fest = document.getElementById('festivo').checked;
    const sexto = document.getElementById('sexto').checked;

    if(!fecha){
      alert(t('select_date'));
      return;
    }

    // Guardar sin importar el estado del cronómetro - datos manuales independientes
    const registros = JSON.parse(localStorage.getItem('registros') || "[]");
    
    // Buscar si ya existe un registro para esta fecha
    const indiceExistente = registros.findIndex(r => r.fecha === fecha);
    
    if(indiceExistente !== -1){
      // Actualizar registro existente
      registros[indiceExistente].dieta_pernocta = dieta;
      registros[indiceExistente].festivo = fest;
      registros[indiceExistente].sexto = sexto;
    } else {
      // Crear nuevo registro
      registros.push({
        fecha: fecha, 
        nocturnas: 0, 
        dieta_pernocta: dieta, 
        festivo: fest, 
        sexto: sexto
      });
    }
    
    localStorage.setItem('registros', JSON.stringify(registros));

    cargarHistorial();
    alert('✅ ' + t('saved_successfully'));
  };

  // FUNCIONALIDAD DE BORRADO
  let registroSeleccionadoIndex = null;

  document.getElementById('botonBorrar').onclick = function(){
    mostrarUltimosRegistros();
    document.getElementById('modalBorrar').classList.add('active');
  };

  document.getElementById('cerrarModal').onclick = function(){
    document.getElementById('modalBorrar').classList.remove('active');
  };

  document.getElementById('cerrarDetalle').onclick = function(){
    document.getElementById('modalDetalle').classList.remove('active');
  };

  document.getElementById('modalBorrar').onclick = function(e){
    if(e.target === this){
      this.classList.remove('active');
    }
  };

  document.getElementById('modalDetalle').onclick = function(e){
    if(e.target === this){
      this.classList.remove('active');
    }
  };

  function mostrarUltimosRegistros(){
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    
    const fechasUnicas = new Set();
    const registrosCombinados = [];

    registros.forEach(r => {
      if(!fechasUnicas.has(r.fecha)){
        fechasUnicas.add(r.fecha);
        registrosCombinados.push({
          fecha: r.fecha,
          datosManual: r,
          datosCrono: registrosCrono.filter(rc => rc.fecha === r.fecha && rc.tipo === 'trabajo')
        });
      }
    });

    registrosCrono.forEach(rc => {
      if(!fechasUnicas.has(rc.fecha) && rc.tipo === 'trabajo'){
        fechasUnicas.add(rc.fecha);
        registrosCombinados.push({
          fecha: rc.fecha,
          datosManual: null,
          datosCrono: registrosCrono.filter(r => r.fecha === rc.fecha && r.tipo === 'trabajo')
        });
      }
    });

    registrosCombinados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const ultimos10 = registrosCombinados.slice(0, 10);

    const listaRegistros = document.getElementById('listaRegistros');
    
    if(ultimos10.length === 0){
      listaRegistros.innerHTML = '<div class="mensaje-vacio">📭 No hay registros para mostrar</div>';
      return;
    }

    listaRegistros.innerHTML = '';
    
    ultimos10.forEach((reg, index) => {
      const div = document.createElement('div');
      div.className = 'registro-item';
      
      const fechaFormateada = new Date(reg.fecha + 'T00:00:00').toLocaleDateString('es-ES');
      const horasTrabajadas = formatearHorasDecimal(reg.datosCrono.reduce((sum, rc) => sum + rc.tiempo, 0));
      
      div.innerHTML = `
        <div class="registro-fecha">📅 ${fechaFormateada}</div>
        <div class="registro-horas">⏱️ ${horasTrabajadas} trabajadas</div>
      `;
      
      div.onclick = () => mostrarDetalle(reg, index);
      listaRegistros.appendChild(div);
    });
  }

  function mostrarDetalle(registro, index){
    registroSeleccionadoIndex = index;
    
    const fechaFormateada = new Date(registro.fecha + 'T00:00:00').toLocaleDateString('es-ES');
    document.getElementById('detalleFecha').textContent = `📅 ${fechaFormateada}`;
    document.getElementById('detalleCheckbox').checked = false;
    
    let html = '';
    
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    const todosCrono = registrosCrono.filter(rc => rc.fecha === registro.fecha);

    if(todosCrono && todosCrono.length > 0){
      html += '<div class="detalle-seccion">';
      html += '<div class="detalle-seccion-titulo">⏱️ ' + t('chronometer_data') + '</div>';

      const trabajo = todosCrono.filter(c => c.tipo === 'trabajo');
      const descanso = todosCrono.filter(c => c.tipo === 'descanso');

      if(trabajo.length > 0){
        trabajo.forEach((crono, idx) => {
          if(trabajo.length > 1){
            html += `<div class="detalle-dato" style="margin-top: ${idx > 0 ? '15px' : '0'}; padding-top: ${idx > 0 ? '15px' : '0'}; border-top: ${idx > 0 ? '1px solid rgba(255, 140, 66, 0.2)' : 'none'};">
              <span class="detalle-dato-label">🔧 ${t('work_session')} ${idx + 1}</span>
            </div>`;
          }
          if(crono.horaInicio){
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🔧 ${t('start_time')}:</span>
              <span class="detalle-dato-valor">${crono.horaInicio}</span>
            </div>`;
          }
          if(crono.horaFin){
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🔧 ${t('end_time')}:</span>
              <span class="detalle-dato-valor">${crono.horaFin}</span>
            </div>`;
          }
          html += `<div class="detalle-dato">
            <span class="detalle-dato-label">🔧 ${t('hours_worked')}:</span>
            <span class="detalle-dato-valor">${formatearHorasDecimal(crono.tiempo)}</span>
          </div>`;
        });

        const totalTrabajo = trabajo.reduce((sum, rc) => sum + rc.tiempo, 0);
        if(trabajo.length > 1){
          html += `<div class="detalle-dato" style="margin-top: 10px; padding-top: 10px; border-top: 2px solid rgba(255, 140, 66, 0.3);">
            <span class="detalle-dato-label">🔧 ${t('total_worked')}:</span>
            <span class="detalle-dato-valor" style="font-size: 1.1em;">${formatearHorasDecimal(totalTrabajo)}</span>
          </div>`;
        }
      }

      if(descanso.length > 0){
        html += `<div style="height: 20px;"></div>`;
        descanso.forEach((crono, idx) => {
          if(descanso.length > 1){
            html += `<div class="detalle-dato" style="margin-top: ${idx > 0 ? '15px' : '0'}; padding-top: ${idx > 0 ? '15px' : '0'}; border-top: ${idx > 0 ? '1px solid rgba(255, 140, 66, 0.2)' : 'none'};">
              <span class="detalle-dato-label">🛏️ ${t('rest_session')} ${idx + 1}</span>
            </div>`;
          }
          if(crono.horaInicio){
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🛏️ ${t('start_time')}:</span>
              <span class="detalle-dato-valor">${crono.horaInicio}</span>
            </div>`;
          }
          if(crono.horaFin){
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🛏️ ${t('end_time')}:</span>
              <span class="detalle-dato-valor">${crono.horaFin}</span>
            </div>`;
          }
          html += `<div class="detalle-dato">
            <span class="detalle-dato-label">🛏️ ${t('hours_rested')}:</span>
            <span class="detalle-dato-valor">${formatearHorasDecimal(crono.tiempo)}</span>
          </div>`;
        });

        const totalDescanso = descanso.reduce((sum, rc) => sum + rc.tiempo, 0);
        if(descanso.length > 1){
          html += `<div class="detalle-dato" style="margin-top: 10px; padding-top: 10px; border-top: 2px solid rgba(255, 140, 66, 0.3);">
            <span class="detalle-dato-label">🛏️ ${t('total_rested')}:</span>
            <span class="detalle-dato-valor" style="font-size: 1.1em;">${formatearHorasDecimal(totalDescanso)}</span>
          </div>`;
        }
      }

      html += '</div>';
    }

    if(registro.datosManual){
      html += '<div class="detalle-seccion">';
      html += '<div class="detalle-seccion-titulo">📝 ' + t('manual_data') + '</div>';

      if(registro.datosManual.nocturnas && parseInt(registro.datosManual.nocturnas) > 0){
        html += `<div class="detalle-dato">
          <span class="detalle-dato-label">🌙 ${t('night_hours')}:</span>
          <span class="detalle-dato-valor">${registro.datosManual.nocturnas} ${t('hours')}</span>
        </div>`;
      }

      html += `<div class="detalle-dato">
        <span class="detalle-dato-label">🛏️ ${t('diet_overnight')}:</span>
        <span class="detalle-dato-valor">${registro.datosManual.dieta_pernocta === 'camion' ? t('in_truck') : t('at_home')}</span>
      </div>`;

      if(registro.datosManual.festivo){
        html += `<div class="detalle-dato">
          <span class="detalle-dato-label">🎉 ${t('holiday')}:</span>
          <span class="detalle-dato-valor">Sí</span>
        </div>`;
      }
      
      if(registro.datosManual.sexto){
        html += `<div class="detalle-dato">
          <span class="detalle-dato-label">⚡ Sexto día consecutivo:</span>
          <span class="detalle-dato-valor">Sí</span>
        </div>`;
      }
      
      html += '</div>';
    }
    
    document.getElementById('detalleContenido').innerHTML = html;
    
    document.getElementById('modalBorrar').classList.remove('active');
    document.getElementById('modalDetalle').classList.add('active');
  }

  document.getElementById('btnBorrarDetalle').onclick = function(){
    const checkbox = document.getElementById('detalleCheckbox');
    
    if(!checkbox.checked){
      alert('⚠️ ' + t('check_to_confirm'));
      return;
    }
    
    if(!confirm(t('confirm_delete'))){
      return;
    }
    
    borrarRegistroActual();
  };

  function borrarRegistroActual(){
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    
    const fechaTexto = document.getElementById('detalleFecha').textContent.replace('📅 ', '');
    const [dia, mes, anio] = fechaTexto.split('/');
    const fechaBuscar = `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    
    const registrosFiltrados = registros.filter(r => r.fecha !== fechaBuscar);
    const cronoFiltrados = registrosCrono.filter(rc => rc.fecha !== fechaBuscar);
    
    localStorage.setItem('registros', JSON.stringify(registrosFiltrados));
    localStorage.setItem('registrosCrono', JSON.stringify(cronoFiltrados));
    
    cargarHistorial();
    document.getElementById('modalDetalle').classList.remove('active');
    
    mostrarUltimosRegistros();
    
    const hayRegistros = registrosFiltrados.length > 0 || cronoFiltrados.length > 0;
    if(hayRegistros){
      document.getElementById('modalBorrar').classList.add('active');
    } else {
      document.getElementById('modalBorrar').classList.remove('active');
    }
    
    alert('✅ ' + t('record_deleted'));
  }

  document.getElementById('resumenMes').onclick = function(){
    const mes = document.getElementById('mesResumen').value;
    if(!mes){ alert(t('select_month')); return; }
    
    const [anio, mesNum] = mes.split('-');
    const registros = JSON.parse(localStorage.getItem('registros') || "[]");
    
    const filtrados = registros.filter(r => r.fecha.startsWith(anio + '-' + mesNum));

    let html = '<div class="resumen"><h3>✨ ' + t('summary') + ' ✨</h3>';
    html += '<div class="resumen-item"><span>' + t('records_found') + ':</span> <span style="color: #000; font-weight: bold; font-size: 1.05em;">' + filtrados.length + '</span></div>';

    let totalNoc = 0;
    let festivos = 0;
    let sextos = 0;
    let camion = 0;
    let casa = 0;

    filtrados.forEach(r => {
      totalNoc += parseInt(r.nocturnas || 0);
      if(r.festivo) festivos++;
      if(r.sexto) sextos++;
      if(r.dieta_pernocta === 'camion') camion++;
      if(r.dieta_pernocta === 'casa') casa++;
    });

    html += '<div class="resumen-item"><span>' + t('night_hours') + ':</span> <span style="color: #000; font-weight: bold; font-size: 1.05em;">' + totalNoc + 'h</span></div>';
    html += '<div class="resumen-item"><span>' + t('festive_days') + ':</span> <span style="color: #000; font-weight: bold; font-size: 1.05em;">' + festivos + '</span></div>';
    html += '<div class="resumen-item"><span>' + t('sixth_days') + ':</span> <span style="color: #000; font-weight: bold; font-size: 1.05em;">' + sextos + '</span></div>';
    html += '<div class="resumen-item"><span>' + t('days_in_truck') + ':</span> <span style="color: #000; font-weight: bold; font-size: 1.05em;">' + camion + '</span></div>';
    html += '<div class="resumen-item"><span>' + t('days_at_home') + ':</span> <span style="color: #000; font-weight: bold; font-size: 1.05em;">' + casa + '</span></div>';
    html += '</div>';
    
    document.getElementById('resumen').innerHTML = html;
  };

  // ========== CALENDARIO 26→25 ==========
  
  function obtenerDiasDelCiclo(mesSeleccionado){
    // mesSeleccionado viene en formato "YYYY-MM"
    const [anio, mes] = mesSeleccionado.split('-').map(Number);
    const diaInicio = parseInt(localStorage.getItem('diaInicioCiclo') || '26');
    const diaFin = diaInicio - 1 || 31; // El día anterior al inicio
    
    // Fecha inicio: día configurado del mes ANTERIOR
    let fechaInicio;
    if(mes === 1){
      // Si es enero, el mes anterior es diciembre del año anterior
      fechaInicio = new Date(anio - 1, 11, diaInicio);
    } else {
      fechaInicio = new Date(anio, mes - 2, diaInicio);
    }
    
    // Fecha fin: día anterior al inicio del mes seleccionado
    const fechaFin = new Date(anio, mes - 1, diaFin);
    
    // Generar array de días
    const dias = [];
    const fechaActual = new Date(fechaInicio);
    
    while(fechaActual <= fechaFin){
      dias.push(new Date(fechaActual));
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
    
    return dias;
  }
  
  function obtenerRegistrosDelDia(fecha){
    // Formatear fecha como YYYY-MM-DD
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const fechaStr = `${anio}-${mes}-${dia}`;
    
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    
    const registroManual = registros.find(r => r.fecha === fechaStr);
    const registrosCronoDelDia = registrosCrono.filter(rc => rc.fecha === fechaStr);
    
    // Solo contar como "trabajo" si hay registros de tipo trabajo o datos manuales
    const tieneTrabajosCrono = registrosCronoDelDia.some(rc => rc.tipo === 'trabajo');
    const tieneDatosManual = registroManual !== undefined;
    
    return {
      fecha: fechaStr,
      datosManual: registroManual || null,
      datosCrono: registrosCronoDelDia,
      tieneDatos: tieneDatosManual || tieneTrabajosCrono
    };
  }
  
  function generarCalendario26_25(mesSeleccionado){
    const dias = obtenerDiasDelCiclo(mesSeleccionado);
    const [anio, mes] = mesSeleccionado.split('-').map(Number);
    
    // Nombres de los meses
    const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    // Calcular mes anterior para el título
    let mesAnterior, anioMesAnterior;
    if(mes === 1){
      mesAnterior = 12;
      anioMesAnterior = anio - 1;
    } else {
      mesAnterior = mes - 1;
      anioMesAnterior = anio;
    }
    
    let html = '<div class="calendario-container">';
    const diaInicio = parseInt(localStorage.getItem('diaInicioCiclo') || '26');
    const diaFin = diaInicio - 1 || 31;
    html += `<div class="calendario-header">📅 ${nombresMeses[mesAnterior - 1]} ${diaInicio} → ${nombresMeses[mes - 1]} ${diaFin} (${anio})</div>`;
    
    // Grid del calendario
    html += '<div class="calendario-grid">';
    
    // Headers de días de la semana (empezando por Lunes)
    const diasSemana = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];
    diasSemana.forEach(dia => {
      html += `<div class="calendario-dia-header">${dia}</div>`;
    });
    
    // Calcular el día de la semana del primer día (0 = Domingo, 1 = Lunes, etc.)
    // Necesitamos ajustar para que Lunes sea 0
    let primerDiaSemana = dias[0].getDay();
    primerDiaSemana = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1; // Ajustar: Domingo (0) -> 6, Lunes (1) -> 0, etc.
    
    // Agregar celdas vacías al inicio
    for(let i = 0; i < primerDiaSemana; i++){
      html += '<div class="calendario-dia vacio"></div>';
    }
    
    // Contadores para estadísticas
    let diasTrabajados = 0;
    let diasDescanso = 0;
    
    // Agregar los días del ciclo
    dias.forEach(fecha => {
      const registro = obtenerRegistrosDelDia(fecha);
      const clase = registro.tieneDatos ? 'trabajo' : 'descanso';
      const diaNum = fecha.getDate();
      const mesCorto = nombresMeses[fecha.getMonth()].substring(0, 3).toUpperCase();
      const fechaStr = registro.fecha;
      
      if(registro.tieneDatos){
        diasTrabajados++;
      } else {
        diasDescanso++;
      }
      
      html += `<div class="calendario-dia ${clase}" data-fecha="${fechaStr}" onclick="mostrarDetalleCalendario('${fechaStr}')">
        <span class="dia-numero">${diaNum}</span>
        <span class="dia-mes">${mesCorto}</span>
      </div>`;
    });
    
    html += '</div>'; // Cerrar grid
    
    // Estadísticas
    html += '<div class="calendario-stats">';
    html += `<div class="stat-box">
      <div class="stat-numero">${diasTrabajados}</div>
      <div class="stat-label">🔧 ${t('days_worked_cal')}</div>
    </div>`;
    html += `<div class="stat-box">
      <div class="stat-numero">${diasDescanso}</div>
      <div class="stat-label">😴 ${t('days_rest_cal')}</div>
    </div>`;
    html += '</div>';
    
    html += '</div>'; // Cerrar container
    
    return html;
  }
  
  // Variable global para almacenar la fecha actual en edición
  let fechaEnEdicion = null;
  
  // Función para generar HTML de edición de sesiones de trabajo
  function generarEdicionSesionesTrabajo(datosCrono, fechaStr){
    const trabajo = datosCrono ? datosCrono.filter(c => c.tipo === 'trabajo') : [];
    let html = '';
    
    html += '<div class="edicion-seccion" id="seccion-trabajo">';
    html += '<div class="edicion-seccion-titulo">🔧 Sesiones de Trabajo</div>';
    
    if(trabajo.length > 0){
      trabajo.forEach((crono, idx) => {
        const horaInicioVal = crono.horaInicio ? crono.horaInicio.substring(0, 5) : '00:00';
        const horaFinVal = crono.horaFin ? crono.horaFin.substring(0, 5) : '00:00';
        
        html += `<div class="sesion-edicion" data-sesion-idx="${idx}" data-tipo="trabajo" data-existente="true">`;
        html += `<div class="sesion-edicion-header">
          <span class="sesion-edicion-titulo">Sesión ${idx + 1}</span>
          <button type="button" class="btn-eliminar-sesion" onclick="eliminarSesion(this, 'trabajo')" title="Eliminar sesión">🗑️</button>
        </div>`;
        
        html += `<div class="edicion-fila">
          <span class="edicion-label">Hora inicio:</span>
          <input type="time" class="edicion-input edicion-hora-inicio" value="${horaInicioVal}" data-idx="${idx}" onchange="recalcularSesion(this, '${fechaStr}')">
        </div>`;
        
        html += `<div class="edicion-fila">
          <span class="edicion-label">Hora fin:</span>
          <input type="time" class="edicion-input edicion-hora-fin" value="${horaFinVal}" data-idx="${idx}" onchange="recalcularSesion(this, '${fechaStr}')">
        </div>`;
        
        html += `<div class="edicion-fila">
          <span class="edicion-label">${t('hours_worked')}:</span>
          <span class="edicion-valor-auto" id="horas-trabajo-${idx}">${formatearHorasDecimal(crono.tiempo)}</span>
        </div>`;
        
        html += `<div class="edicion-fila">
          <span class="edicion-label">${t('night_hours')}:</span>
          <span class="edicion-valor-auto" id="horas-nocturnas-${idx}">${formatearHorasDecimal(crono.horasNocturnas || 0)}</span>
        </div>`;
        
        html += '</div>';
      });
    } else {
      html += '<div class="mensaje-sin-sesiones" id="msg-sin-trabajo">No hay sesiones de trabajo registradas</div>';
    }
    
    // Contenedor para nuevas sesiones
    html += '<div id="nuevas-sesiones-trabajo"></div>';
    
    // Botón para añadir nueva sesión
    html += `<button type="button" class="btn-nueva-sesion" onclick="agregarNuevaSesionTrabajo('${fechaStr}')">
      <span>➕</span> Añadir ${t('work_session')}
    </button>`;
    
    html += '</div>';
    
    return html;
  }
  
  // Función para generar HTML de edición de sesiones de descanso (solo visualización, se calcula automático)
  function generarEdicionSesionesDescanso(datosCrono, fechaStr){
    const descanso = datosCrono ? datosCrono.filter(c => c.tipo === 'descanso') : [];
    let html = '';
    
    if(descanso.length > 0){
      html += '<div class="edicion-seccion" id="seccion-descanso">';
      html += '<div class="edicion-seccion-titulo">🛏️ Descansos (automático)</div>';
      html += '<div class="mensaje-info-descanso">El descanso se calcula automáticamente entre sesiones de trabajo</div>';
      
      descanso.forEach((crono, idx) => {
        html += `<div class="sesion-edicion sesion-descanso-readonly" data-sesion-idx="${idx}" data-tipo="descanso">`;
        html += `<div class="sesion-edicion-titulo">Descanso ${idx + 1}</div>`;
        
        html += `<div class="edicion-fila">
          <span class="edicion-label">Inicio:</span>
          <span class="edicion-valor-auto">${crono.horaInicio || '--:--'}</span>
        </div>`;
        
        html += `<div class="edicion-fila">
          <span class="edicion-label">Fin:</span>
          <span class="edicion-valor-auto">${crono.horaFin || '--:--'}</span>
        </div>`;
        
        html += `<div class="edicion-fila">
          <span class="edicion-label">Duración:</span>
          <span class="edicion-valor-auto">${formatearHorasDecimal(crono.tiempo)}</span>
        </div>`;
        
        html += '</div>';
      });
      
      html += '</div>';
    }
    
    return html;
  }
  
  // Función para generar HTML de edición de datos manuales
  function generarEdicionDatosManuales(datosManual){
    let html = '<div class="edicion-seccion">';
    html += '<div class="edicion-seccion-titulo">📝 ${t('manual_data')}</div>';
    
    const dietaValor = datosManual ? datosManual.dieta_pernocta : 'casa';
    const festivoValor = datosManual ? datosManual.festivo : false;
    const sextoValor = datosManual ? datosManual.sexto : false;
    
    html += `<div class="edicion-fila">
      <span class="edicion-label">Dieta pernocta:</span>
      <select class="edicion-select" id="edicion-dieta">
        <option value="casa" ${dietaValor === 'casa' ? 'selected' : ''}>En casa</option>
        <option value="camion" ${dietaValor === 'camion' ? 'selected' : ''}>En camión</option>
      </select>
    </div>`;
    
    html += `<div class="edicion-fila">
      <label class="edicion-checkbox-container">
        <input type="checkbox" class="edicion-checkbox" id="edicion-festivo" ${festivoValor ? 'checked' : ''}>
        <span>🎉 Festivo</span>
      </label>
    </div>`;
    
    html += `<div class="edicion-fila">
      <label class="edicion-checkbox-container">
        <input type="checkbox" class="edicion-checkbox" id="edicion-sexto" ${sextoValor ? 'checked' : ''}>
        <span>6️⃣ Sexto día consecutivo</span>
      </label>
    </div>`;
    
    html += '</div>';
    return html;
  }
  
  // Función para recalcular sesión de trabajo
  window.recalcularSesion = function(input, fechaStr){
    const idx = input.dataset.idx;
    const container = input.closest('.sesion-edicion');
    const horaInicio = container.querySelector('.edicion-hora-inicio').value;
    const horaFin = container.querySelector('.edicion-hora-fin').value;
    
    if(horaInicio && horaFin){
      // Crear timestamps para calcular
      const fechaBase = new Date(fechaStr + 'T00:00:00');
      let timestampInicio = new Date(fechaStr + 'T' + horaInicio + ':00').getTime();
      let timestampFin = new Date(fechaStr + 'T' + horaFin + ':00').getTime();
      
      // Si la hora fin es menor que inicio, asumimos que es del día siguiente
      if(timestampFin <= timestampInicio){
        timestampFin += 24 * 60 * 60 * 1000;
      }
      
      const horasTrabajadas = (timestampFin - timestampInicio) / 1000 / 3600;
      const horasNocturnas = calcularHorasNocturnas(timestampInicio, timestampFin);
      
      document.getElementById('horas-trabajo-' + idx).textContent = formatearHorasDecimal(horasTrabajadas);
      document.getElementById('horas-nocturnas-' + idx).textContent = formatearHorasDecimal(horasNocturnas);
    }
  };
  
  // Contadores para nuevas sesiones
  let contadorNuevasTrabajo = 100;
  
  // Función para agregar nueva sesión de trabajo
  window.agregarNuevaSesionTrabajo = function(fechaStr){
    const contenedor = document.getElementById('nuevas-sesiones-trabajo');
    const msgSin = document.getElementById('msg-sin-trabajo');
    if(msgSin) msgSin.style.display = 'none';
    
    const idx = contadorNuevasTrabajo++;
    
    let html = `<div class="sesion-edicion nueva-sesion" data-sesion-idx="${idx}" data-tipo="trabajo" data-nueva="true">`;
    html += `<div class="sesion-edicion-header">
      <span class="sesion-edicion-titulo">🆕 Nueva ${t('work_session')}</span>
      <button type="button" class="btn-eliminar-sesion" onclick="eliminarSesion(this, 'trabajo')" title="Eliminar sesión">🗑️</button>
    </div>`;
    
    html += `<div class="edicion-fila">
      <span class="edicion-label">Hora inicio:</span>
      <input type="time" class="edicion-input edicion-hora-inicio" value="08:00" data-idx="${idx}" onchange="recalcularNuevaSesion(this, '${fechaStr}', 'trabajo')">
    </div>`;
    
    html += `<div class="edicion-fila">
      <span class="edicion-label">Hora fin:</span>
      <input type="time" class="edicion-input edicion-hora-fin" value="16:00" data-idx="${idx}" onchange="recalcularNuevaSesion(this, '${fechaStr}', 'trabajo')">
    </div>`;
    
    html += `<div class="edicion-fila">
      <span class="edicion-label">${t('hours_worked')}:</span>
      <span class="edicion-valor-auto" id="horas-trabajo-${idx}">8.00h</span>
    </div>`;
    
    html += `<div class="edicion-fila">
      <span class="edicion-label">${t('night_hours')}:</span>
      <span class="edicion-valor-auto" id="horas-nocturnas-${idx}">0.00h</span>
    </div>`;
    
    html += '</div>';
    
    contenedor.insertAdjacentHTML('beforeend', html);
    
    // Recalcular con valores por defecto
    const nuevoEl = contenedor.lastElementChild;
    recalcularNuevaSesion(nuevoEl.querySelector('.edicion-hora-inicio'), fechaStr, 'trabajo');
  };
  
  // Función para recalcular nueva sesión (solo trabajo)
  window.recalcularNuevaSesion = function(input, fechaStr, tipo){
    const container = input.closest('.sesion-edicion');
    const idx = container.dataset.sesionIdx;
    
    const horaInicio = container.querySelector('.edicion-hora-inicio').value;
    const horaFin = container.querySelector('.edicion-hora-fin').value;
    
    if(horaInicio && horaFin){
      let timestampInicio = new Date(fechaStr + 'T' + horaInicio + ':00').getTime();
      let timestampFin = new Date(fechaStr + 'T' + horaFin + ':00').getTime();
      
      if(timestampFin <= timestampInicio){
        timestampFin += 24 * 60 * 60 * 1000;
      }
      
      const horasTrabajadas = (timestampFin - timestampInicio) / 1000 / 3600;
      const horasNocturnas = calcularHorasNocturnas(timestampInicio, timestampFin);
      
      document.getElementById('horas-trabajo-' + idx).textContent = formatearHorasDecimal(horasTrabajadas);
      document.getElementById('horas-nocturnas-' + idx).textContent = formatearHorasDecimal(horasNocturnas);
    }
  };
  
  // Función para eliminar sesión
  window.eliminarSesion = function(btn, tipo){
    const sesion = btn.closest('.sesion-edicion');
    sesion.classList.add('eliminada');
    sesion.style.display = 'none';
    sesion.dataset.eliminada = 'true';
  };
  
  // Función para guardar edición
  window.guardarEdicionDia = function(fechaStr){
    let registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    
    // 1. Eliminar sesiones marcadas como eliminadas
    const sesionesEliminadas = document.querySelectorAll('.sesion-edicion[data-eliminada="true"][data-existente="true"]');
    sesionesEliminadas.forEach(sesion => {
      const tipo = sesion.dataset.tipo;
      const idx = parseInt(sesion.dataset.sesionIdx);
      const sesionesActuales = registrosCrono.filter(r => r.fecha === fechaStr && r.tipo === tipo);
      
      if(sesionesActuales[idx]){
        const indexOriginal = registrosCrono.findIndex(r => 
          r.fecha === fechaStr && 
          r.tipo === tipo && 
          r.timestampInicio === sesionesActuales[idx].timestampInicio
        );
        if(indexOriginal !== -1){
          registrosCrono.splice(indexOriginal, 1);
        }
      }
    });
    
    // 2. Actualizar sesiones de trabajo existentes (no eliminadas)
    const sesionesTrabajoExistentes = document.querySelectorAll('.sesion-edicion[data-tipo="trabajo"][data-existente="true"]:not([data-eliminada="true"])');
    const trabajoActuales = registrosCrono.filter(r => r.fecha === fechaStr && r.tipo === 'trabajo');
    
    sesionesTrabajoExistentes.forEach((sesion) => {
      const idx = parseInt(sesion.dataset.sesionIdx);
      if(trabajoActuales[idx]){
        const horaInicio = sesion.querySelector('.edicion-hora-inicio').value;
        const horaFin = sesion.querySelector('.edicion-hora-fin').value;
        
        let timestampInicio = new Date(fechaStr + 'T' + horaInicio + ':00').getTime();
        let timestampFin = new Date(fechaStr + 'T' + horaFin + ':00').getTime();
        
        if(timestampFin <= timestampInicio){
          timestampFin += 24 * 60 * 60 * 1000;
        }
        
        const horasTrabajadas = (timestampFin - timestampInicio) / 1000 / 3600;
        const horasNocturnas = calcularHorasNocturnas(timestampInicio, timestampFin);
        
        const indexOriginal = registrosCrono.findIndex(r => 
          r.fecha === fechaStr && 
          r.tipo === 'trabajo' && 
          r.timestampInicio === trabajoActuales[idx].timestampInicio
        );
        
        if(indexOriginal !== -1){
          registrosCrono[indexOriginal].horaInicio = horaInicio + ':00';
          registrosCrono[indexOriginal].horaFin = horaFin + ':00';
          registrosCrono[indexOriginal].tiempo = Math.round(horasTrabajadas * 100) / 100;
          registrosCrono[indexOriginal].horasNocturnas = horasNocturnas;
          registrosCrono[indexOriginal].timestampInicio = timestampInicio;
          registrosCrono[indexOriginal].timestampFin = timestampFin;
        }
      }
    });
    
    // 3. Añadir nuevas sesiones de trabajo
    const nuevasTrabajoUI = document.querySelectorAll('.sesion-edicion[data-tipo="trabajo"][data-nueva="true"]:not([data-eliminada="true"])');
    nuevasTrabajoUI.forEach(sesion => {
      const horaInicio = sesion.querySelector('.edicion-hora-inicio').value;
      const horaFin = sesion.querySelector('.edicion-hora-fin').value;
      
      if(horaInicio && horaFin){
        let timestampInicio = new Date(fechaStr + 'T' + horaInicio + ':00').getTime();
        let timestampFin = new Date(fechaStr + 'T' + horaFin + ':00').getTime();
        
        if(timestampFin <= timestampInicio){
          timestampFin += 24 * 60 * 60 * 1000;
        }
        
        const horasTrabajadas = (timestampFin - timestampInicio) / 1000 / 3600;
        const horasNocturnas = calcularHorasNocturnas(timestampInicio, timestampFin);
        
        registrosCrono.push({
          fecha: fechaStr,
          tipo: 'trabajo',
          tiempo: Math.round(horasTrabajadas * 100) / 100,
          timestamp: Date.now(),
          horaInicio: horaInicio + ':00',
          horaFin: horaFin + ':00',
          timestampInicio: timestampInicio,
          timestampFin: timestampFin,
          horasNocturnas: horasNocturnas
        });
      }
    });
    
    // 4. Los descansos ya no se editan manualmente - se calculan automáticamente
    // Solo mantenemos los descansos existentes sin modificar
    
    // 5. Actualizar datos manuales
    const dieta = document.getElementById('edicion-dieta').value;
    const festivo = document.getElementById('edicion-festivo').checked;
    const sexto = document.getElementById('edicion-sexto').checked;
    
    const indexManual = registros.findIndex(r => r.fecha === fechaStr);
    
    // Recalcular horas nocturnas totales del día
    const trabajosDelDia = registrosCrono.filter(r => r.fecha === fechaStr && r.tipo === 'trabajo');
    const totalNocturnas = trabajosDelDia.reduce((sum, r) => sum + (r.horasNocturnas || 0), 0);
    
    if(indexManual !== -1){
      registros[indexManual].dieta_pernocta = dieta;
      registros[indexManual].festivo = festivo;
      registros[indexManual].sexto = sexto;
      registros[indexManual].nocturnas = Math.round(totalNocturnas * 100) / 100;
    } else {
      registros.push({
        fecha: fechaStr,
        nocturnas: Math.round(totalNocturnas * 100) / 100,
        dieta_pernocta: dieta,
        festivo: festivo,
        sexto: sexto
      });
    }
    
    // 7. Guardar todo
    localStorage.setItem('registrosCrono', JSON.stringify(registrosCrono));
    localStorage.setItem('registros', JSON.stringify(registros));
    
    // 8. Actualizar interfaz
    actualizarDisplayNocturnas();
    cargarHistorial();
    
    document.getElementById('modalDetalleCalendario').classList.remove('active');
    
    const mesSeleccionado = document.getElementById('mesResumenReal').value;
    if(mesSeleccionado){
      const calendarioHTML = generarCalendario26_25(mesSeleccionado);
      document.getElementById('resumenRealResultado').innerHTML = calendarioHTML;
    }
    
    alert('✅ Datos guardados correctamente');
  };
  
  // Función global para mostrar detalle del calendario
  window.mostrarDetalleCalendario = function(fechaStr){
    fechaEnEdicion = fechaStr;
    const fecha = new Date(fechaStr + 'T00:00:00');
    const registro = obtenerRegistrosDelDia(fecha);
    
    const fechaFormateada = fecha.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    document.getElementById('detalleFechaCalendario').textContent = `📅 ${fechaFormateada}`;
    
    let html = '';
    
    if(!registro.tieneDatos){
      html = '<div class="detalle-seccion">';
      html += '<div class="detalle-seccion-titulo">😴 Día de Descanso</div>';
      html += '<div class="detalle-dato">';
      html += '<span class="detalle-dato-valor">No hay registros para este día. ¡Disfrute de la vida!</span>';
      html += '</div>';
      html += '</div>';
    } else {
      // Sección de cronómetro
      if(registro.datosCrono && registro.datosCrono.length > 0){
        html += '<div class="detalle-seccion">';
        html += '<div class="detalle-seccion-titulo">⏱️ ${t('chronometer_data')}</div>';
        
        const trabajo = registro.datosCrono.filter(c => c.tipo === 'trabajo');
        const descanso = registro.datosCrono.filter(c => c.tipo === 'descanso');
        
        if(trabajo.length > 0){
          let totalNocturnas = 0;
          trabajo.forEach((crono, idx) => {
            if(trabajo.length > 1){
              html += `<div class="detalle-dato" style="margin-top: ${idx > 0 ? '15px' : '0'}; padding-top: ${idx > 0 ? '15px' : '0'}; border-top: ${idx > 0 ? '1px solid rgba(255, 140, 66, 0.2)' : 'none'};">
                <span class="detalle-dato-label">🔧 ${t('work_session')} ${idx + 1}</span>
              </div>`;
            }
            if(crono.horaInicio){
              html += `<div class="detalle-dato">
                <span class="detalle-dato-label">🔧 ${t('start_time')}:</span>
                <span class="detalle-dato-valor">${crono.horaInicio}</span>
              </div>`;
            }
            if(crono.horaFin){
              html += `<div class="detalle-dato">
                <span class="detalle-dato-label">🔧 ${t('end_time')}:</span>
                <span class="detalle-dato-valor">${crono.horaFin}</span>
              </div>`;
            }
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🔧 ${t('hours_worked')}:</span>
              <span class="detalle-dato-valor">${formatearHorasDecimal(crono.tiempo)}</span>
            </div>`;
            if(crono.horasNocturnas !== undefined && crono.horasNocturnas > 0){
              html += `<div class="detalle-dato">
                <span class="detalle-dato-label">🌙 ${t('night_hours')}:</span>
                <span class="detalle-dato-valor">${formatearHorasDecimal(crono.horasNocturnas)}</span>
              </div>`;
              totalNocturnas += crono.horasNocturnas;
            }
          });
          
          const totalTrabajo = trabajo.reduce((sum, rc) => sum + rc.tiempo, 0);
          if(trabajo.length > 1){
            html += `<div class="detalle-dato" style="margin-top: 10px; padding-top: 10px; border-top: 2px solid rgba(255, 140, 66, 0.3);">
              <span class="detalle-dato-label">🔧 ${t('total_worked')}:</span>
              <span class="detalle-dato-valor" style="font-size: 1.1em;">${formatearHorasDecimal(totalTrabajo)}</span>
            </div>`;
            if(totalNocturnas > 0){
              html += `<div class="detalle-dato">
                <span class="detalle-dato-label">🌙 ${t('night_hours').toUpperCase()}:</span>
                <span class="detalle-dato-valor" style="font-size: 1.1em;">${formatearHorasDecimal(totalNocturnas)}</span>
              </div>`;
            }
          }
        }
        
        if(descanso.length > 0){
          html += `<div style="height: 20px;"></div>`;
          descanso.forEach((crono, idx) => {
            if(descanso.length > 1){
              html += `<div class="detalle-dato" style="margin-top: ${idx > 0 ? '15px' : '0'}; padding-top: ${idx > 0 ? '15px' : '0'}; border-top: ${idx > 0 ? '1px solid rgba(255, 140, 66, 0.2)' : 'none'};">
                <span class="detalle-dato-label">🛏️ ${t('rest_session')} ${idx + 1}</span>
              </div>`;
            }
            if(crono.horaInicio){
              html += `<div class="detalle-dato">
                <span class="detalle-dato-label">🛏️ ${t('start_time')}:</span>
                <span class="detalle-dato-valor">${crono.horaInicio}</span>
              </div>`;
            }
            if(crono.horaFin){
              html += `<div class="detalle-dato">
                <span class="detalle-dato-label">🛏️ ${t('end_time')}:</span>
                <span class="detalle-dato-valor">${crono.horaFin}</span>
              </div>`;
            }
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🛏️ ${t('hours_rested')}:</span>
              <span class="detalle-dato-valor">${formatearHorasDecimal(crono.tiempo)}</span>
            </div>`;
          });
          
          const totalDescanso = descanso.reduce((sum, rc) => sum + rc.tiempo, 0);
          if(descanso.length > 1){
            html += `<div class="detalle-dato" style="margin-top: 10px; padding-top: 10px; border-top: 2px solid rgba(255, 140, 66, 0.3);">
              <span class="detalle-dato-label">🛏️ ${t('total_rested')}:</span>
              <span class="detalle-dato-valor" style="font-size: 1.1em;">${formatearHorasDecimal(totalDescanso)}</span>
            </div>`;
          }
        }
        
        html += '</div>';
      }
      
      // Sección de datos manuales
      if(registro.datosManual){
        html += '<div class="detalle-seccion">';
        html += '<div class="detalle-seccion-titulo">📝 ${t('manual_data')}</div>';
        
        if(registro.datosManual.nocturnas && parseInt(registro.datosManual.nocturnas) > 0){
          html += `<div class="detalle-dato">
            <span class="detalle-dato-label">🌙 ${t('night_hours')}:</span>
            <span class="detalle-dato-valor">${registro.datosManual.nocturnas} horas</span>
          </div>`;
        }
        
        html += `<div class="detalle-dato">
          <span class="detalle-dato-label">🛏️ Dieta pernocta:</span>
          <span class="detalle-dato-valor">${registro.datosManual.dieta_pernocta === 'camion' ? 'En camión' : 'En casa'}</span>
        </div>`;
        
        if(registro.datosManual.festivo){
          html += `<div class="detalle-dato">
            <span class="detalle-dato-label">🎉 Festivo:</span>
            <span class="detalle-dato-valor">Sí</span>
          </div>`;
        }
        
        if(registro.datosManual.sexto){
          html += `<div class="detalle-dato">
            <span class="detalle-dato-label">⚡ Sexto día consecutivo:</span>
            <span class="detalle-dato-valor">Sí</span>
          </div>`;
        }
        
        html += '</div>';
      }
    }
    
    // Botón para desplegar edición
    html += `<button class="btn-toggle-edicion" id="btnToggleEdicion" onclick="toggleEdicion('${fechaStr}')">
      <span class="flecha">▼</span> Editar Datos
    </button>`;
    
    // Contenedor de edición (oculto por defecto)
    html += `<div class="edicion-container" id="edicionContainer">`;
    
    // Generar formulario de edición - siempre mostrar las secciones
    html += generarEdicionSesionesTrabajo(registro.datosCrono || [], fechaStr);
    html += generarEdicionSesionesDescanso(registro.datosCrono || [], fechaStr);
    html += generarEdicionDatosManuales(registro.datosManual);
    
    // Botón guardar
    html += `<button class="btn-guardar-edicion" onclick="guardarEdicionDia('${fechaStr}')">💾 GUARDAR CAMBIOS</button>`;
    
    html += '</div>';
    
    document.getElementById('detalleContenidoCalendario').innerHTML = html;
    document.getElementById('modalDetalleCalendario').classList.add('active');
  };
  
  // Función para mostrar/ocultar edición
  window.toggleEdicion = function(fechaStr){
    const btn = document.getElementById('btnToggleEdicion');
    const container = document.getElementById('edicionContainer');
    
    btn.classList.toggle('activo');
    container.classList.toggle('visible');
  };
  
  document.getElementById('cerrarDetalleCalendario').onclick = function(){
    document.getElementById('modalDetalleCalendario').classList.remove('active');
  };
  
  document.getElementById('modalDetalleCalendario').onclick = function(e){
    if(e.target === this){
      this.classList.remove('active');
    }
  };
  
  document.getElementById('resumenReal').onclick = function(){
    const mes = document.getElementById('mesResumenReal').value;
    if(!mes){ 
      alert('Selecciona mes'); 
      return; 
    }
    
    const calendarioHTML = generarCalendario26_25(mes);
    document.getElementById('resumenRealResultado').innerHTML = calendarioHTML;
  };

  // FUNCIONALIDAD DE RESUMEN DIARIO (Últimos 10 días)
  document.getElementById('btnMostrarDiarios').onclick = function(){
    cargarUltimosDias();
  };

  function cargarUltimosDias(){
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    
    const fechasUnicas = new Set();
    const registrosCombinados = [];

    registros.forEach(r => {
      if(!fechasUnicas.has(r.fecha)){
        fechasUnicas.add(r.fecha);
        registrosCombinados.push({
          fecha: r.fecha,
          datosManual: r,
          datosCrono: registrosCrono.filter(rc => rc.fecha === r.fecha)
        });
      }
    });

    registrosCrono.forEach(rc => {
      if(!fechasUnicas.has(rc.fecha)){
        fechasUnicas.add(rc.fecha);
        registrosCombinados.push({
          fecha: rc.fecha,
          datosManual: null,
          datosCrono: registrosCrono.filter(r => r.fecha === rc.fecha)
        });
      }
    });

    registrosCombinados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const ultimos10 = registrosCombinados.slice(0, 10);

    const listaDias = document.getElementById('listaDiasResumen');
    
    if(ultimos10.length === 0){
      listaDias.innerHTML = '<div class="mensaje-vacio">📭 No hay registros para mostrar</div>';
      return;
    }

    listaDias.innerHTML = '';
    
    ultimos10.forEach((reg) => {
      const div = document.createElement('div');
      div.className = 'registro-item';
      
      const fechaFormateada = new Date(reg.fecha + 'T00:00:00').toLocaleDateString('es-ES');
      const trabajo = reg.datosCrono.filter(c => c.tipo === 'trabajo');
      const horasTrabajadas = formatearHorasDecimal(trabajo.reduce((sum, rc) => sum + rc.tiempo, 0));
      
      div.innerHTML = `
        <div class="registro-fecha">📅 ${fechaFormateada}</div>
        <div class="registro-horas">⏱️ ${horasTrabajadas} trabajadas</div>
      `;
      
      div.onclick = () => mostrarDetalleDiario(reg);
      listaDias.appendChild(div);
    });
  }

  function mostrarDetalleDiario(registro){
    const fechaFormateada = new Date(registro.fecha + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('detalleFechaDiario').textContent = `📅 ${fechaFormateada}`;
    
    let html = '';
    
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    const todosCrono = registrosCrono.filter(rc => rc.fecha === registro.fecha);
    
    if(todosCrono && todosCrono.length > 0){
      html += '<div class="detalle-seccion">';
      html += '<div class="detalle-seccion-titulo">⏱️ ${t('chronometer_data')}</div>';
      
      const trabajo = todosCrono.filter(c => c.tipo === 'trabajo');
      const descanso = todosCrono.filter(c => c.tipo === 'descanso');
      
      if(trabajo.length > 0){
        trabajo.forEach((crono, idx) => {
          if(trabajo.length > 1){
            html += `<div class="detalle-dato" style="margin-top: ${idx > 0 ? '15px' : '0'}; padding-top: ${idx > 0 ? '15px' : '0'}; border-top: ${idx > 0 ? '1px solid rgba(255, 140, 66, 0.2)' : 'none'};">
              <span class="detalle-dato-label">🔧 ${t('work_session')} ${idx + 1}</span>
            </div>`;
          }
          if(crono.horaInicio){
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🔧 ${t('start_time')}:</span>
              <span class="detalle-dato-valor">${crono.horaInicio}</span>
            </div>`;
          }
          if(crono.horaFin){
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🔧 ${t('end_time')}:</span>
              <span class="detalle-dato-valor">${crono.horaFin}</span>
            </div>`;
          }
          html += `<div class="detalle-dato">
            <span class="detalle-dato-label">🔧 ${t('hours_worked')}:</span>
            <span class="detalle-dato-valor">${formatearHorasDecimal(crono.tiempo)}</span>
          </div>`;
        });
        
        const totalTrabajo = trabajo.reduce((sum, rc) => sum + rc.tiempo, 0);
        if(trabajo.length > 1){
          html += `<div class="detalle-dato" style="margin-top: 10px; padding-top: 10px; border-top: 2px solid rgba(255, 140, 66, 0.3);">
            <span class="detalle-dato-label">🔧 ${t('total_worked')}:</span>
            <span class="detalle-dato-valor" style="font-size: 1.1em;">${formatearHorasDecimal(totalTrabajo)}</span>
          </div>`;
        }
      }
      
      if(descanso.length > 0){
        html += `<div style="height: 20px;"></div>`;
        descanso.forEach((crono, idx) => {
          if(descanso.length > 1){
            html += `<div class="detalle-dato" style="margin-top: ${idx > 0 ? '15px' : '0'}; padding-top: ${idx > 0 ? '15px' : '0'}; border-top: ${idx > 0 ? '1px solid rgba(255, 140, 66, 0.2)' : 'none'};">
              <span class="detalle-dato-label">🛏️ ${t('rest_session')} ${idx + 1}</span>
            </div>`;
          }
          if(crono.horaInicio){
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🛏️ ${t('start_time')}:</span>
              <span class="detalle-dato-valor">${crono.horaInicio}</span>
            </div>`;
          }
          if(crono.horaFin){
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🛏️ ${t('end_time')}:</span>
              <span class="detalle-dato-valor">${crono.horaFin}</span>
            </div>`;
          }
          html += `<div class="detalle-dato">
            <span class="detalle-dato-label">🛏️ ${t('hours_rested')}:</span>
            <span class="detalle-dato-valor">${formatearHorasDecimal(crono.tiempo)}</span>
          </div>`;
        });
        
        const totalDescanso = descanso.reduce((sum, rc) => sum + rc.tiempo, 0);
        if(descanso.length > 1){
          html += `<div class="detalle-dato" style="margin-top: 10px; padding-top: 10px; border-top: 2px solid rgba(255, 140, 66, 0.3);">
            <span class="detalle-dato-label">🛏️ ${t('total_rested')}:</span>
            <span class="detalle-dato-valor" style="font-size: 1.1em;">${formatearHorasDecimal(totalDescanso)}</span>
          </div>`;
        }
      }
      
      html += '</div>';
    }
    
    if(registro.datosManual){
      html += '<div class="detalle-seccion">';
      html += '<div class="detalle-seccion-titulo">📝 ${t('manual_data')}</div>';
      
      if(registro.datosManual.nocturnas && parseInt(registro.datosManual.nocturnas) > 0){
        html += `<div class="detalle-dato">
          <span class="detalle-dato-label">🌙 ${t('night_hours')}:</span>
          <span class="detalle-dato-valor">${registro.datosManual.nocturnas} horas</span>
        </div>`;
      }
      
      html += `<div class="detalle-dato">
        <span class="detalle-dato-label">🛏️ Dieta pernocta:</span>
        <span class="detalle-dato-valor">${registro.datosManual.dieta_pernocta === 'camion' ? 'En camión' : 'En casa'}</span>
      </div>`;
      
      if(registro.datosManual.festivo){
        html += `<div class="detalle-dato">
          <span class="detalle-dato-label">🎉 Festivo:</span>
          <span class="detalle-dato-valor">Sí</span>
        </div>`;
      }
      
      if(registro.datosManual.sexto){
        html += `<div class="detalle-dato">
          <span class="detalle-dato-label">⚡ Sexto día consecutivo:</span>
          <span class="detalle-dato-valor">Sí</span>
        </div>`;
      }
      
      html += '</div>';
    }
    
    document.getElementById('detalleContenidoDiario').innerHTML = html;
    document.getElementById('modalDetalleDiario').classList.add('active');
  }

  document.getElementById('cerrarDetalleDiario').onclick = function(){
    document.getElementById('modalDetalleDiario').classList.remove('active');
  };

  document.getElementById('modalDetalleDiario').onclick = function(e){
    if(e.target === this){
      this.classList.remove('active');
    }
  };

  cargarHistorial();
  recuperarEstadoCrono();
  actualizarDisplayNocturnas();
  cargarPersonalizacion();

  // Event listener para alternar formato del cronómetro al hacer click
  const relojCrono = document.getElementById('reloj');
  if(relojCrono){
    relojCrono.addEventListener('click', toggleFormatoCrono);
    relojCrono.style.cursor = 'pointer'; // Indicar que es clickeable
  }

  // ========== NAVEGACIÓN POR PÁGINAS ==========
  function cambiarPagina(idPagina){
    // Ocultar todas las páginas
    document.querySelectorAll('.pagina').forEach(p => p.classList.remove('active'));
    // Mostrar la página seleccionada
    document.getElementById(idPagina).classList.add('active');
    
    // Actualizar botones de navegación
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.nav-btn[data-pagina="${idPagina}"]`).classList.add('active');
    
    // Scroll arriba
    window.scrollTo(0, 0);
    
    // Si es la página de gráficas, actualizar
    if(idPagina === 'paginaGraficas'){
      actualizarGraficas('semana');
    }
  }
  window.cambiarPagina = cambiarPagina;

  // ========== GRÁFICAS ==========
  let chartTrabajo = null;
  let chartDescanso = null;

  // Selector de período
  document.querySelectorAll('.periodo-btn').forEach(btn => {
    btn.addEventListener('click', function(){
      document.querySelectorAll('.periodo-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      actualizarGraficas(this.dataset.periodo);
    });
  });

  function obtenerDatosGrafica(periodo){
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    const ahora = new Date();
    let fechaInicio;
    
    switch(periodo){
      case 'semana':
        fechaInicio = new Date(ahora);
        fechaInicio.setDate(fechaInicio.getDate() - 7);
        break;
      case 'mes':
        fechaInicio = new Date(ahora);
        fechaInicio.setMonth(fechaInicio.getMonth() - 1);
        break;
      case 'anio':
        fechaInicio = new Date(ahora);
        fechaInicio.setFullYear(fechaInicio.getFullYear() - 1);
        break;
      case 'todo':
        fechaInicio = new Date(2020, 0, 1);
        break;
    }
    
    // Filtrar registros por período
    const trabajos = registrosCrono.filter(r => {
      const fecha = new Date(r.fecha);
      return r.tipo === 'trabajo' && fecha >= fechaInicio && fecha <= ahora;
    });
    
    const descansos = registrosCrono.filter(r => {
      const fecha = new Date(r.fecha);
      return r.tipo === 'descanso' && fecha >= fechaInicio && fecha <= ahora;
    });
    
    // Agrupar por día
    const trabajoPorDia = {};
    const descansoPorDia = {};
    
    trabajos.forEach(r => {
      if(!trabajoPorDia[r.fecha]) trabajoPorDia[r.fecha] = 0;
      trabajoPorDia[r.fecha] += r.tiempo;
    });
    
    descansos.forEach(r => {
      if(!descansoPorDia[r.fecha]) descansoPorDia[r.fecha] = 0;
      descansoPorDia[r.fecha] += r.tiempo;
    });
    
    // Convertir a arrays ordenados
    const fechasTrabajo = Object.keys(trabajoPorDia).sort();
    const fechasDescanso = Object.keys(descansoPorDia).sort();
    
    const labelsTrabajo = fechasTrabajo.map(f => {
      const d = new Date(f + 'T00:00:00');
      return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
    });
    
    const labelsDescanso = fechasDescanso.map(f => {
      const d = new Date(f + 'T00:00:00');
      return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
    });
    
    const datosTrabajo = fechasTrabajo.map(f => Math.round(trabajoPorDia[f] * 100) / 100);
    const datosDescanso = fechasDescanso.map(f => Math.round(descansoPorDia[f] * 100) / 100);
    
    // Calcular estadísticas
    const totalTrabajo = datosTrabajo.reduce((a, b) => a + b, 0);
    const totalDescanso = datosDescanso.reduce((a, b) => a + b, 0);
    const promedioTrabajo = datosTrabajo.length > 0 ? totalTrabajo / datosTrabajo.length : 0;
    const promedioDescanso = datosDescanso.length > 0 ? totalDescanso / datosDescanso.length : 0;
    
    return {
      trabajo: { labels: labelsTrabajo, datos: datosTrabajo, total: totalTrabajo, promedio: promedioTrabajo, dias: fechasTrabajo.length },
      descanso: { labels: labelsDescanso, datos: datosDescanso, total: totalDescanso, promedio: promedioDescanso, dias: fechasDescanso.length }
    };
  }

  function actualizarGraficas(periodo){
    const datos = obtenerDatosGrafica(periodo);
    
    // Actualizar estadísticas
    document.getElementById('totalHorasTrabajo').textContent = formatearHorasCompacto(datos.trabajo.total);
    document.getElementById('promedioTrabajo').textContent = formatearHorasCompacto(datos.trabajo.promedio);
    document.getElementById('diasTrabajados').textContent = datos.trabajo.dias;
    
    document.getElementById('totalHorasDescanso').textContent = formatearHorasCompacto(datos.descanso.total);
    document.getElementById('promedioDescanso').textContent = formatearHorasCompacto(datos.descanso.promedio);
    document.getElementById('diasDescanso').textContent = datos.descanso.dias;
    
    // Destruir gráficas anteriores
    if(chartTrabajo) chartTrabajo.destroy();
    if(chartDescanso) chartDescanso.destroy();
    
    // Crear gráfica de trabajo
    const ctxTrabajo = document.getElementById('graficaTrabajo').getContext('2d');
    chartTrabajo = new Chart(ctxTrabajo, {
      type: 'line',
      data: {
        labels: datos.trabajo.labels,
        datasets: [{
          label: 'Horas Trabajadas',
          data: datos.trabajo.datos,
          borderColor: '#ff8c42',
          backgroundColor: 'rgba(255, 140, 66, 0.2)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#ff8c42',
          pointBorderColor: '#fff',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255, 140, 66, 0.1)' },
            ticks: { color: '#e0e0e0' }
          },
          x: {
            grid: { color: 'rgba(255, 140, 66, 0.1)' },
            ticks: { color: '#e0e0e0', maxRotation: 45 }
          }
        }
      }
    });
    
    // Crear gráfica de descanso
    const ctxDescanso = document.getElementById('graficaDescanso').getContext('2d');
    chartDescanso = new Chart(ctxDescanso, {
      type: 'line',
      data: {
        labels: datos.descanso.labels,
        datasets: [{
          label: 'Horas de Descanso',
          data: datos.descanso.datos,
          borderColor: '#66BB6A',
          backgroundColor: 'rgba(102, 187, 106, 0.2)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#66BB6A',
          pointBorderColor: '#fff',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(102, 187, 106, 0.1)' },
            ticks: { color: '#e0e0e0' }
          },
          x: {
            grid: { color: 'rgba(102, 187, 106, 0.1)' },
            ticks: { color: '#e0e0e0', maxRotation: 45 }
          }
        }
      }
    });
  }

  // ========== AJUSTES - PERSONALIZACIÓN ==========
  document.getElementById('colorPrincipal').addEventListener('input', function(){
    document.getElementById('colorPrincipalHex').textContent = this.value;
  });
  
  document.getElementById('tamanoTexto').addEventListener('input', function(){
    document.getElementById('tamanoTextoValor').textContent = this.value + 'px';
  });

  function aplicarPersonalizacion(){
    const color = document.getElementById('colorPrincipal').value;
    const tamano = document.getElementById('tamanoTexto').value;
    const fuente = document.getElementById('fuenteTexto').value;
    
    // Guardar en localStorage
    localStorage.setItem('personalizacion', JSON.stringify({ color, tamano, fuente }));
    
    // Aplicar estilos
    document.documentElement.style.setProperty('--color-principal', color);
    document.body.style.fontSize = tamano + 'px';
    document.body.style.fontFamily = fuente;
    
    alert('✨ ' + t('customization_applied'));
  }
  window.aplicarPersonalizacion = aplicarPersonalizacion;

  function resetearPersonalizacion(){
    localStorage.removeItem('personalizacion');
    document.getElementById('colorPrincipal').value = '#ff8c42';
    document.getElementById('colorPrincipalHex').textContent = '#ff8c42';
    document.getElementById('tamanoTexto').value = '16';
    document.getElementById('tamanoTextoValor').textContent = '16px';
    document.getElementById('fuenteTexto').value = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    
    document.body.style.fontSize = '';
    document.body.style.fontFamily = '';
    
    alert('🔄 ' + t('defaults_restored'));
  }
  window.resetearPersonalizacion = resetearPersonalizacion;

  function cargarPersonalizacion(){
    const guardado = localStorage.getItem('personalizacion');
    if(guardado){
      const { color, tamano, fuente } = JSON.parse(guardado);
      
      document.getElementById('colorPrincipal').value = color;
      document.getElementById('colorPrincipalHex').textContent = color;
      document.getElementById('tamanoTexto').value = tamano;
      document.getElementById('tamanoTextoValor').textContent = tamano + 'px';
      document.getElementById('fuenteTexto').value = fuente;
      
      document.body.style.fontSize = tamano + 'px';
      document.body.style.fontFamily = fuente;
    }
  }

  // ========== AJUSTES - EXPORTAR DATOS ==========
  function exportarDatos(tipo){
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    
    let datosExportar = { registros: [], registrosCrono: [] };
    let nombreArchivo = 'regyster_';
    
    if(tipo === 'mes'){
      const mesSeleccionado = document.getElementById('mesExportar').value;
      if(!mesSeleccionado){
        alert('⚠️ Selecciona un mes para exportar');
        return;
      }
      
      datosExportar.registros = registros.filter(r => r.fecha.startsWith(mesSeleccionado));
      datosExportar.registrosCrono = registrosCrono.filter(r => r.fecha.startsWith(mesSeleccionado));
      nombreArchivo += mesSeleccionado;
    } else {
      datosExportar.registros = registros;
      datosExportar.registrosCrono = registrosCrono;
      nombreArchivo += 'completo_' + new Date().toISOString().split('T')[0];
    }
    
    // Añadir metadatos
    datosExportar.metadata = {
      exportadoEl: new Date().toISOString(),
      version: '2.0',
      totalRegistros: datosExportar.registros.length,
      totalCrono: datosExportar.registrosCrono.length
    };
    
    // Calcular resúmenes
    const trabajos = datosExportar.registrosCrono.filter(r => r.tipo === 'trabajo');
    const descansos = datosExportar.registrosCrono.filter(r => r.tipo === 'descanso');
    
    const totalTrabajo = trabajos.reduce((sum, r) => sum + r.tiempo, 0);
    const totalDescanso = descansos.reduce((sum, r) => sum + r.tiempo, 0);
    const totalNocturnas = trabajos.reduce((sum, r) => sum + (r.horasNocturnas || 0), 0);
    
    datosExportar.resumen = {
      totalHorasTrabajo: formatearHorasDecimal(totalTrabajo),
      totalHorasTrabajoDecimal: totalTrabajo.toFixed(2),
      totalHorasDescanso: formatearHorasDecimal(totalDescanso),
      totalHorasDescansoDecimal: totalDescanso.toFixed(2),
      totalHorasNocturnas: formatearHorasDecimal(totalNocturnas),
      totalHorasNocturnasDecimal: totalNocturnas.toFixed(2),
      diasTrabajados: new Set(trabajos.map(r => r.fecha)).size,
      diasDescanso: new Set(descansos.map(r => r.fecha)).size,
      diasFestivos: datosExportar.registros.filter(r => r.festivo).length,
      diasSexto: datosExportar.registros.filter(r => r.sexto).length,
      diasCamion: datosExportar.registros.filter(r => r.dieta_pernocta === 'camion').length,
      diasCasa: datosExportar.registros.filter(r => r.dieta_pernocta === 'casa').length
    };
    
    // Crear archivo y descargar
    const blob = new Blob([JSON.stringify(datosExportar, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Datos exportados correctamente');
  }
  window.exportarDatos = exportarDatos;

  // ========== EXPORTAR A PDF ==========
  function exportarPDF(tipo){
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');

    let registrosFiltrados = [];
    let registrosCronoFiltrados = [];
    let nombreArchivo = 'regyster_';
    let tituloDocumento = '';

    if(tipo === 'mes'){
      const mesSeleccionado = document.getElementById('mesExportar').value;
      if(!mesSeleccionado){
        alert('⚠️ Selecciona un mes para exportar');
        return;
      }

      registrosFiltrados = registros.filter(r => r.fecha.startsWith(mesSeleccionado));
      registrosCronoFiltrados = registrosCrono.filter(r => r.fecha.startsWith(mesSeleccionado));
      nombreArchivo += mesSeleccionado;

      // Formatear mes para el título
      const [year, month] = mesSeleccionado.split('-');
      const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      tituloDocumento = `Registro de ${meses[parseInt(month)-1]} ${year}`;
    } else {
      registrosFiltrados = registros;
      registrosCronoFiltrados = registrosCrono;
      nombreArchivo += 'completo_' + new Date().toISOString().split('T')[0];
      tituloDocumento = 'Registro Completo de Trabajo';
    }

    // Validar que haya datos para exportar
    if(registrosCronoFiltrados.length === 0 && registrosFiltrados.length === 0){
      alert('⚠️ No hay registros para exportar en el período seleccionado');
      return;
    }

    // Calcular resúmenes
    const trabajos = registrosCronoFiltrados.filter(r => r.tipo === 'trabajo');
    const descansos = registrosCronoFiltrados.filter(r => r.tipo === 'descanso');

    const totalTrabajo = trabajos.reduce((sum, r) => sum + r.tiempo, 0);
    const totalDescanso = descansos.reduce((sum, r) => sum + r.tiempo, 0);
    const totalNocturnas = trabajos.reduce((sum, r) => sum + (r.horasNocturnas || 0), 0);

    // Crear contenido HTML para el PDF
    let htmlContent = `
<div id="pdf-content" style="font-family: Arial, sans-serif; padding: 20px; background: white; color: #000;">
  <div style="text-align: center; margin-bottom: 25px; border-bottom: 3px solid #ff8c42; padding-bottom: 15px;">
    <h1 style="color: #ff8c42; font-size: 24px; margin-bottom: 8px;">📊 ${tituloDocumento}</h1>
    <p style="color: #666; font-size: 11px;">Generado el ${new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} a las ${new Date().toLocaleTimeString('es-ES')}</p>
  </div>

  <div style="background: #f5f5f5; border: 2px solid #ff8c42; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
    <h2 style="color: #ff8c42; font-size: 18px; margin-bottom: 12px; text-align: center;">📈 Resumen Global</h2>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
      <div style="background: white; padding: 10px; border-left: 4px solid #ff8c42; border-radius: 4px;">
        <strong style="color: #ff8c42; display: block; margin-bottom: 4px; font-size: 11px;">⏰ Horas de Trabajo</strong>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${formatearHorasDecimal(totalTrabajo)}</span>
      </div>
      <div style="background: white; padding: 10px; border-left: 4px solid #ff8c42; border-radius: 4px;">
        <strong style="color: #ff8c42; display: block; margin-bottom: 4px; font-size: 11px;">💤 Horas de Descanso</strong>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${formatearHorasDecimal(totalDescanso)}</span>
      </div>
      <div style="background: white; padding: 10px; border-left: 4px solid #ff8c42; border-radius: 4px;">
        <strong style="color: #ff8c42; display: block; margin-bottom: 4px; font-size: 11px;">🌙 Horas Nocturnas</strong>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${formatearHorasDecimal(totalNocturnas)}</span>
      </div>
      <div style="background: white; padding: 10px; border-left: 4px solid #ff8c42; border-radius: 4px;">
        <strong style="color: #ff8c42; display: block; margin-bottom: 4px; font-size: 11px;">📅 Días Trabajados</strong>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${new Set(trabajos.map(r => r.fecha)).size} días</span>
      </div>
      <div style="background: white; padding: 10px; border-left: 4px solid #ff8c42; border-radius: 4px;">
        <strong style="color: #ff8c42; display: block; margin-bottom: 4px; font-size: 11px;">🎉 Días Festivos</strong>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${registrosFiltrados.filter(r => r.festivo).length} días</span>
      </div>
      <div style="background: white; padding: 10px; border-left: 4px solid #ff8c42; border-radius: 4px;">
        <strong style="color: #ff8c42; display: block; margin-bottom: 4px; font-size: 11px;">📆 Sextos Días</strong>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${registrosFiltrados.filter(r => r.sexto).length} días</span>
      </div>
      <div style="background: white; padding: 10px; border-left: 4px solid #ff8c42; border-radius: 4px;">
        <strong style="color: #ff8c42; display: block; margin-bottom: 4px; font-size: 11px;">🚛 Pernoctas Camión</strong>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${registrosFiltrados.filter(r => r.dieta_pernocta === 'camion').length} días</span>
      </div>
      <div style="background: white; padding: 10px; border-left: 4px solid #ff8c42; border-radius: 4px;">
        <strong style="color: #ff8c42; display: block; margin-bottom: 4px; font-size: 11px;">🏠 Pernoctas Casa</strong>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${registrosFiltrados.filter(r => r.dieta_pernocta === 'casa').length} días</span>
      </div>
    </div>
  </div>
`;

    // Registros cronómetro agrupados por fecha
    if(registrosCronoFiltrados.length > 0){
      htmlContent += `
  <div style="margin-bottom: 25px;">
    <h3 style="color: #ff8c42; font-size: 16px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #ff8c42;">⏱️ Registros de Cronómetro</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
      <thead>
        <tr>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Fecha</th>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Tipo</th>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Hora Inicio</th>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Hora Fin</th>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Duración</th>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Nocturnas</th>
        </tr>
      </thead>
      <tbody>
`;

      // Ordenar por fecha descendente
      registrosCronoFiltrados.sort((a, b) => b.fecha.localeCompare(a.fecha) || b.horaInicio.localeCompare(a.horaInicio));

      registrosCronoFiltrados.forEach((r, index) => {
        const fechaFormateada = new Date(r.fecha + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: 'short' });
        const bgColor = index % 2 === 0 ? '#f9f9f9' : 'white';
        const badgeColor = r.tipo === 'trabajo' ? '#4CAF50' : '#2196F3';
        const badgeText = r.tipo === 'trabajo' ? '⏰ TRABAJO' : '💤 DESCANSO';

        htmlContent += `
        <tr style="background: ${bgColor};">
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;">${fechaFormateada}</td>
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;"><span style="display: inline-block; padding: 2px 6px; border-radius: 3px; font-size: 9px; font-weight: bold; background: ${badgeColor}; color: white;">${badgeText}</span></td>
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;">${r.horaInicio}</td>
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;">${r.horaFin}</td>
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;"><strong>${formatearHorasDecimal(r.tiempo)}</strong></td>
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;">${r.horasNocturnas ? formatearHorasDecimal(r.horasNocturnas) : '-'}</td>
        </tr>
`;
      });

      htmlContent += `
      </tbody>
    </table>
  </div>
`;
    }

    // Registros manuales
    if(registrosFiltrados.length > 0){
      htmlContent += `
  <div style="margin-bottom: 25px;">
    <h3 style="color: #ff8c42; font-size: 16px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #ff8c42;">📝 Registros Manuales</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
      <thead>
        <tr>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Fecha</th>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Pernocta/Dieta</th>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Festivo</th>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Sexto Día</th>
        </tr>
      </thead>
      <tbody>
`;

      // Ordenar por fecha descendente
      registrosFiltrados.sort((a, b) => b.fecha.localeCompare(a.fecha));

      registrosFiltrados.forEach((r, index) => {
        const fechaFormateada = new Date(r.fecha + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
        const bgColor = index % 2 === 0 ? '#f9f9f9' : 'white';

        htmlContent += `
        <tr style="background: ${bgColor};">
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;">${fechaFormateada}</td>
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;">${r.dieta_pernocta === 'camion' ? '🚛 Camión' : (r.dieta_pernocta === 'casa' ? '🏠 Casa' : '-')}</td>
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;">${r.festivo ? '✅ Sí' : '-'}</td>
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;">${r.sexto ? '✅ Sí' : '-'}</td>
        </tr>
`;
      });

      htmlContent += `
      </tbody>
    </table>
  </div>
`;
    }

    htmlContent += `
  <div style="text-align: center; margin-top: 30px; padding-top: 15px; border-top: 2px solid #ddd; color: #666; font-size: 10px;">
    <p><strong>Regyster</strong> - Sistema de Registro de Trabajo v2.0</p>
    <p>Documento generado automáticamente - Todos los derechos reservados</p>
  </div>
</div>
`;

    // Crear elemento temporal en el DOM
    const elemento = document.createElement('div');
    elemento.innerHTML = htmlContent;
    elemento.style.position = 'absolute';
    elemento.style.left = '-9999px';
    document.body.appendChild(elemento);

    // Mostrar mensaje de generación
    const loadingMsg = document.createElement('div');
    loadingMsg.textContent = '📄 Generando PDF...';
    loadingMsg.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #ff8c42; color: white; padding: 20px 40px; border-radius: 10px; font-size: 18px; font-weight: bold; z-index: 10000; box-shadow: 0 4px 20px rgba(0,0,0,0.3);';
    document.body.appendChild(loadingMsg);

    // Detectar si es móvil
    const esMobil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const esIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    // Configuración de html2pdf
    const opciones = {
      margin: 10,
      filename: nombreArchivo + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: esMobil ? 1.5 : 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generar PDF
    html2pdf().set(opciones).from(elemento.querySelector('#pdf-content')).outputPdf('blob').then((pdfBlob) => {
      // Limpiar elemento temporal
      document.body.removeChild(elemento);

      // Crear blob con tipo correcto
      const blob = new Blob([pdfBlob], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const nombreCompleto = nombreArchivo + '.pdf';

      // Si es iOS y soporta Web Share API, ofrecer compartir
      if (esIOS && navigator.share) {
        // Crear File desde Blob para compartir en iOS
        const file = new File([blob], nombreCompleto, { type: 'application/pdf' });

        navigator.share({
          title: 'Regyster - ' + tituloDocumento,
          text: 'Exportación de registros de trabajo',
          files: [file]
        }).then(() => {
          document.body.removeChild(loadingMsg);
          console.log('PDF compartido correctamente');
        }).catch((error) => {
          // Si falla compartir, intentar descarga normal
          console.log('No se pudo compartir, descargando...', error);
          descargarPDF(url, nombreCompleto);
        });
      } else {
        // Descarga normal para Android y escritorio
        descargarPDF(url, nombreCompleto);
      }

      // Función auxiliar para descargar
      function descargarPDF(url, nombre) {
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = nombre;
        document.body.appendChild(a);
        a.click();

        // Limpiar
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          document.body.removeChild(loadingMsg);

          // Mensaje específico según plataforma
          if (esMobil) {
            alert('✅ PDF guardado en Descargas: ' + nombre + '\n\n📁 Revisa la carpeta de Descargas de tu dispositivo.');
          } else {
            alert('✅ PDF exportado correctamente: ' + nombre);
          }
        }, 100);
      }
    }).catch(error => {
      console.error('Error al generar PDF:', error);
      document.body.removeChild(elemento);
      if (document.body.contains(loadingMsg)) {
        document.body.removeChild(loadingMsg);
      }
      alert('❌ Error al generar el PDF. Por favor, inténtalo de nuevo.\n\nDetalles: ' + error.message);
    });
  }
  window.exportarPDF = exportarPDF;

  // ========== AJUSTES - BORRAR DATOS ==========
  function borrarTodosDatos(){
    if(!confirm(t('confirm_delete_all'))){
      return;
    }

    if(!confirm(t('confirm_delete_all'))){
      return;
    }
    
    localStorage.removeItem('registros');
    localStorage.removeItem('registrosCrono');
    localStorage.removeItem('estadoCrono');
    
    cargarHistorial();
    actualizarDisplayNocturnas();
    
    alert('🗑️ ' + t('all_data_deleted'));
    cambiarPagina('paginaInicio');
  }
  window.borrarTodosDatos = borrarTodosDatos;

  function limpiarCache(){
    if(!confirm(t('confirm_clean_cache'))){
      return;
    }
    
    if('caches' in window){
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    
    if('serviceWorker' in navigator){
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister();
        });
      });
    }
    
    alert('🧹 ' + t('cache_cleaned'));
    location.reload(true);
  }
  window.limpiarCache = limpiarCache;

  // ========== NUEVOS AJUSTES - TANDA 1 ==========
  
  // Toggle Modo Claro/Oscuro
  function toggleModoClaro(){
    const toggle = document.getElementById('toggleModoClaro');
    toggle.classList.toggle('activo');
    document.body.classList.toggle('modo-claro');
    
    // Guardar preferencia
    localStorage.setItem('modoClaro', document.body.classList.contains('modo-claro'));
  }
  window.toggleModoClaro = toggleModoClaro;
  
  // Toggle Efectos Neón
  function toggleNeon(){
    const toggle = document.getElementById('toggleNeon');
    toggle.classList.toggle('activo');
    document.body.classList.toggle('neon-off');
    
    // Guardar preferencia (activo = neón encendido)
    localStorage.setItem('neonOff', document.body.classList.contains('neon-off'));
  }
  window.toggleNeon = toggleNeon;
  
  // Cambiar Velocidad de Animaciones
  function cambiarVelocidadAnimaciones(){
    const velocidad = document.getElementById('velocidadAnimaciones').value;
    
    // Quitar todas las clases de animación
    document.body.classList.remove('anim-rapidas', 'anim-lentas', 'anim-off');
    
    // Añadir la clase correspondiente
    if(velocidad === 'rapidas'){
      document.body.classList.add('anim-rapidas');
    } else if(velocidad === 'lentas'){
      document.body.classList.add('anim-lentas');
    } else if(velocidad === 'off'){
      document.body.classList.add('anim-off');
    }
    
    // Guardar preferencia
    localStorage.setItem('velocidadAnimaciones', velocidad);
  }
  window.cambiarVelocidadAnimaciones = cambiarVelocidadAnimaciones;
  
  // Cambiar Formato de Horas
  function cambiarFormatoHoras(){
    const formato = document.getElementById('formatoHoras').value;
    localStorage.setItem('formatoHoras', formato);
    
    // Actualizar displays
    actualizarDisplayNocturnas();
  }
  window.cambiarFormatoHoras = cambiarFormatoHoras;
  
  // Función modificada para formatear horas según preferencia
  window.formatearHorasSegunPreferencia = function(horasDecimal){
    const formato = localStorage.getItem('formatoHoras') || 'tradicional';
    
    if(formato === 'decimal'){
      return horasDecimal.toFixed(2) + 'h';
    } else {
      return formatearHorasDecimal(horasDecimal);
    }
  };
  
  // Cargar ajustes guardados al iniciar
  function cargarAjustesNuevos(){
    // Modo claro
    const modoClaro = localStorage.getItem('modoClaro') === 'true';
    if(modoClaro){
      document.body.classList.add('modo-claro');
      document.getElementById('toggleModoClaro').classList.add('activo');
    }
    
    // Neón
    const neonOff = localStorage.getItem('neonOff') === 'true';
    if(neonOff){
      document.body.classList.add('neon-off');
      document.getElementById('toggleNeon').classList.remove('activo');
    }
    
    // Velocidad animaciones
    const velocidad = localStorage.getItem('velocidadAnimaciones') || 'normales';
    document.getElementById('velocidadAnimaciones').value = velocidad;
    if(velocidad !== 'normales'){
      cambiarVelocidadAnimaciones();
    }
    
    // Formato horas
    const formato = localStorage.getItem('formatoHoras') || 'tradicional';
    document.getElementById('formatoHoras').value = formato;
  }
  
  // Ejecutar al cargar la página
  cargarAjustesNuevos();

  // ========== TANDA 2: HORARIOS Y CICLOS ==========
  
  // Guardar configuración de horarios
  function guardarConfigHorarios(){
    const horaInicio = document.getElementById('horaInicioNocturnas').value;
    const horaFin = document.getElementById('horaFinNocturnas').value;
    const diaInicio = document.getElementById('diaInicioCiclo').value;
    
    localStorage.setItem('horaInicioNocturnas', horaInicio);
    localStorage.setItem('horaFinNocturnas', horaFin);
    localStorage.setItem('diaInicioCiclo', diaInicio);
    
    // Actualizar el display de nocturnas
    actualizarDisplayNocturnas();
  }
  window.guardarConfigHorarios = guardarConfigHorarios;
  
  // Cargar configuración de horarios al iniciar
  function cargarConfigHorarios(){
    const horaInicio = localStorage.getItem('horaInicioNocturnas') || '22';
    const horaFin = localStorage.getItem('horaFinNocturnas') || '6';
    const diaInicio = localStorage.getItem('diaInicioCiclo') || '26';
    
    document.getElementById('horaInicioNocturnas').value = horaInicio;
    document.getElementById('horaFinNocturnas').value = horaFin;
    document.getElementById('diaInicioCiclo').value = diaInicio;
  }
  cargarConfigHorarios();
  
  // Importar datos desde archivo JSON
  function importarDatos(event){
    const archivo = event.target.files[0];
    if(!archivo){
      return;
    }
    
    if(!archivo.name.endsWith('.json')){
      alert('⚠️ Por favor selecciona un archivo .json válido');
      return;
    }
    
    if(!confirm('⚠️ ATENCIÓN: Esto reemplazará TODOS tus datos actuales.\n\n¿Estás seguro de que quieres continuar?')){
      event.target.value = '';
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e){
      try {
        const datos = JSON.parse(e.target.result);
        
        // Validar estructura del archivo
        if(!datos.registros && !datos.registrosCrono){
          throw new Error('Estructura de archivo inválida');
        }
        
        // Importar registros
        if(datos.registros){
          localStorage.setItem('registros', JSON.stringify(datos.registros));
        }
        
        // Importar registros del cronómetro
        if(datos.registrosCrono){
          localStorage.setItem('registrosCrono', JSON.stringify(datos.registrosCrono));
        }
        
        // Mostrar resumen de importación
        const totalRegistros = datos.registros ? datos.registros.length : 0;
        const totalCrono = datos.registrosCrono ? datos.registrosCrono.length : 0;
        
        alert(`✅ Datos importados correctamente!\n\n📋 Registros manuales: ${totalRegistros}\n⏱️ Registros cronómetro: ${totalCrono}\n\nLa página se recargará para aplicar los cambios.`);
        
        // Recargar página
        location.reload();
        
      } catch(error){
        alert('❌ Error al importar: El archivo no tiene un formato válido.\n\nAsegúrate de que sea un archivo exportado desde Regyster.');
        console.error('Error de importación:', error);
      }
    };
    
    reader.onerror = function(){
      alert('❌ Error al leer el archivo');
    };
    
    reader.readAsText(archivo);
    event.target.value = '';
  }
  window.importarDatos = importarDatos;

  // ========== TANDA 3: NOTIFICACIONES Y ALERTAS ==========
  
  // Toggle Vibración
  function toggleVibrar(){
    const toggle = document.getElementById('toggleVibrar');
    toggle.classList.toggle('activo');
    localStorage.setItem('vibrarAlFichar', toggle.classList.contains('activo'));
  }
  window.toggleVibrar = toggleVibrar;
  
  // Toggle Sonido
  function toggleSonido(){
    const toggle = document.getElementById('toggleSonido');
    toggle.classList.toggle('activo');
    localStorage.setItem('sonidoAlFichar', toggle.classList.contains('activo'));
  }
  window.toggleSonido = toggleSonido;
  
  // Toggle Límite de Horas
  function toggleLimiteHoras(){
    const toggle = document.getElementById('toggleLimiteHoras');
    toggle.classList.toggle('activo');
    const activo = toggle.classList.contains('activo');
    localStorage.setItem('limiteHorasActivo', activo);
    document.getElementById('configLimiteHoras').style.display = activo ? 'block' : 'none';
  }
  window.toggleLimiteHoras = toggleLimiteHoras;
  
  function guardarLimiteHoras(){
    const limite = document.getElementById('limiteHorasDiarias').value;
    localStorage.setItem('limiteHorasDiarias', limite);
  }
  window.guardarLimiteHoras = guardarLimiteHoras;
  
  // Toggle Recordatorio
  function toggleRecordatorio(){
    const toggle = document.getElementById('toggleRecordatorio');
    toggle.classList.toggle('activo');
    const activo = toggle.classList.contains('activo');
    localStorage.setItem('recordatorioActivo', activo);
    document.getElementById('configRecordatorio').style.display = activo ? 'block' : 'none';
    
    if(activo){
      iniciarRecordatorio();
    } else {
      detenerRecordatorio();
    }
  }
  window.toggleRecordatorio = toggleRecordatorio;
  
  function guardarRecordatorio(){
    const tiempo = document.getElementById('tiempoRecordatorio').value;
    localStorage.setItem('tiempoRecordatorio', tiempo);
    if(localStorage.getItem('recordatorioActivo') === 'true'){
      iniciarRecordatorio();
    }
  }
  window.guardarRecordatorio = guardarRecordatorio;
  
  // Sistema de recordatorio
  let intervaloRecordatorio = null;
  
  function iniciarRecordatorio(){
    detenerRecordatorio();
    const minutos = parseInt(localStorage.getItem('tiempoRecordatorio') || '60');
    
    intervaloRecordatorio = setInterval(() => {
      // Verificar si hay actividad reciente
      const estadoCrono = JSON.parse(localStorage.getItem('estadoCrono') || '{}');
      const ahora = Date.now();
      
      // Si está trabajando, no mostrar recordatorio
      if(estadoCrono.trabajando) return;
      
      // Si hay un último fin de trabajo, verificar tiempo transcurrido
      if(estadoCrono.ultimoFinTrabajo){
        const tiempoTranscurrido = (ahora - estadoCrono.ultimoFinTrabajo) / 1000 / 60;
        if(tiempoTranscurrido >= minutos){
          mostrarRecordatorio();
        }
      }
    }, 60000); // Verificar cada minuto
  }
  
  function detenerRecordatorio(){
    if(intervaloRecordatorio){
      clearInterval(intervaloRecordatorio);
      intervaloRecordatorio = null;
    }
  }
  
  function mostrarRecordatorio(){
    if('Notification' in window && Notification.permission === 'granted'){
      new Notification('⏰ Regyster - Recordatorio', {
        body: '¿Has empezado a trabajar? No olvides fichar.',
        icon: 'icons/icon-192.png'
      });
    } else {
      // Fallback: vibración si está activa
      if(localStorage.getItem('vibrarAlFichar') === 'true' && navigator.vibrate){
        navigator.vibrate([200, 100, 200, 100, 200]);
      }
    }
  }
  
  // Función para ejecutar al fichar (vibración y sonido)
  function efectosAlFichar(){
    // Vibración
    if(localStorage.getItem('vibrarAlFichar') === 'true' && navigator.vibrate){
      navigator.vibrate(200);
    }
    
    // Sonido
    if(localStorage.getItem('sonidoAlFichar') === 'true'){
      reproducirSonidoFichaje();
    }
  }
  
  // Crear sonido de fichaje
  function reproducirSonidoFichaje(){
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch(e){
      console.log('Audio no disponible');
    }
  }
  
  // Verificar límite de horas
  function verificarLimiteHoras(){
    if(localStorage.getItem('limiteHorasActivo') !== 'true') return;
    
    const limite = parseInt(localStorage.getItem('limiteHorasDiarias') || '10');
    const fechaHoy = new Date().toISOString().split('T')[0];
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    
    const trabajoHoy = registrosCrono.filter(r => r.fecha === fechaHoy && r.tipo === 'trabajo');
    const horasHoy = trabajoHoy.reduce((sum, r) => sum + r.tiempo, 0);
    
    if(horasHoy >= limite){
      alert(`⚠️ ${t('attention')}\n\n${t('hours_limit_exceeded')} ${limite} ${t('daily_hours')}.\n\n${t('hours_worked_today')} ${formatearHorasDecimal(horasHoy)}\n\n${t('remember_rest')}`);

      if(navigator.vibrate){
        navigator.vibrate([500, 200, 500, 200, 500]);
      }
    }
  }
  
  // Cargar configuración de notificaciones al iniciar
  function cargarConfigNotificaciones(){
    // Vibración (activa por defecto)
    const vibrar = localStorage.getItem('vibrarAlFichar');
    if(vibrar === null){
      localStorage.setItem('vibrarAlFichar', 'true');
    } else if(vibrar === 'false'){
      document.getElementById('toggleVibrar').classList.remove('activo');
    }
    
    // Sonido
    if(localStorage.getItem('sonidoAlFichar') === 'true'){
      document.getElementById('toggleSonido').classList.add('activo');
    }
    
    // Límite de horas
    if(localStorage.getItem('limiteHorasActivo') === 'true'){
      document.getElementById('toggleLimiteHoras').classList.add('activo');
      document.getElementById('configLimiteHoras').style.display = 'block';
    }
    const limite = localStorage.getItem('limiteHorasDiarias') || '10';
    document.getElementById('limiteHorasDiarias').value = limite;
    
    // Recordatorio
    if(localStorage.getItem('recordatorioActivo') === 'true'){
      document.getElementById('toggleRecordatorio').classList.add('activo');
      document.getElementById('configRecordatorio').style.display = 'block';
      iniciarRecordatorio();
      
      // Solicitar permisos de notificación
      if('Notification' in window && Notification.permission === 'default'){
        Notification.requestPermission();
      }
    }
    const tiempo = localStorage.getItem('tiempoRecordatorio') || '60';
    document.getElementById('tiempoRecordatorio').value = tiempo;
  }
  cargarConfigNotificaciones();

  // ========== STICKMAN ESPÍA - EASTER EGG ==========
  const stickmanContainer = document.getElementById('stickmanContainer');
  const direcciones = ['desde-izquierda', 'desde-derecha'];
  let stickmanActivo = false;

  function mostrarStickman(){
    if(stickmanActivo) return;
    stickmanActivo = true;

    // Quitar direcciones anteriores
    direcciones.forEach(d => stickmanContainer.classList.remove(d));
    stickmanContainer.classList.remove('visible');

    // Elegir dirección random (solo izquierda o derecha)
    const direccion = direcciones[Math.floor(Math.random() * direcciones.length)];

    // Posición vertical random dentro del viewport (evitando header y footer)
    const topPos = 120 + Math.random() * (window.innerHeight - 280);
    stickmanContainer.style.top = topPos + 'px';
    stickmanContainer.style.bottom = 'auto';
    stickmanContainer.style.left = direccion === 'desde-izquierda' ? '0' : 'auto';
    stickmanContainer.style.right = direccion === 'desde-derecha' ? '0' : 'auto';

    // Añadir dirección y mostrar
    stickmanContainer.classList.add(direccion);

    // Pequeño delay para que la transición funcione con efecto bounce
    setTimeout(() => {
      stickmanContainer.classList.add('visible');
    }, 100);

    // Esconderse después de 3.5-5 segundos (más tiempo para disfrutar la animación)
    const tiempoEspiando = 3500 + Math.random() * 1500;

    setTimeout(() => {
      stickmanContainer.classList.remove('visible');

      // Marcar como inactivo después de la animación de esconderse
      setTimeout(() => {
        stickmanActivo = false;
      }, 1000); // 1 segundo para la transición de salida
    }, tiempoEspiando);
  }

  // Iniciar el ciclo del stickman espía (cada 15 segundos)
  setInterval(mostrarStickman, 15000);

  // Primera aparición después de 5 segundos
  setTimeout(mostrarStickman, 5000);

  // ========== EASTER EGG - NUESTRA FIRMA SECRETA ==========
  let clicksEasterEgg = 0;
  let timerEasterEgg = null;
  let easterEggActivo = false;
  
  document.getElementById('infoVersion').addEventListener('click', function(e) {
    if(easterEggActivo) return;
    
    clicksEasterEgg++;
    
    if(timerEasterEgg) clearTimeout(timerEasterEgg);
    
    timerEasterEgg = setTimeout(() => {
      clicksEasterEgg = 0;
    }, 1000);
    
    if(clicksEasterEgg >= 4) {
      clicksEasterEgg = 0;
      easterEggActivo = true;
      
      const textoNormal = document.getElementById('textoNormal');
      const textoSecreto = document.getElementById('textoSecreto');
      
      // Glitch out del texto normal
      textoNormal.classList.add('glitch-out');
      
      setTimeout(() => {
        textoNormal.style.display = 'none';
        textoSecreto.style.display = 'block';
        textoSecreto.classList.add('glitch-in');
        
        // Después de 20 segundos, volver al texto normal
        setTimeout(() => {
          textoSecreto.classList.remove('glitch-in');
          textoSecreto.classList.add('glitch-out');
          
          setTimeout(() => {
            textoSecreto.style.display = 'none';
            textoSecreto.classList.remove('glitch-out');
            textoNormal.style.display = 'block';
            textoNormal.classList.remove('glitch-out');
            textoNormal.classList.add('glitch-in');
            
            setTimeout(() => {
              textoNormal.classList.remove('glitch-in');
              easterEggActivo = false;
            }, 800);
          }, 800);
        }, 20000);
      }, 800);
    }
  });
