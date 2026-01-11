/**
 * Get localized field value with fallback logic
 *
 * @param {Object} item - The object containing the fields
 * @param {string} fieldName - Base field name (e.g., 'title', 'description')
 * @param {string} locale - Current locale ('en', 'ru', 'am')
 * @returns {string} - Localized value or fallback
 *
 * Logic:
 * - If locale is 'ru', return fieldName_ru if exists, otherwise return fieldName
 * - If locale is 'am', return fieldName_am if exists, otherwise return fieldName
 * - If locale is 'en', return fieldName
 */
export function getLocalizedField(item, fieldName, locale) {
  if (!item) return "";

  // For English, always use the base field
  if (locale === "en") {
    return item[fieldName] || "";
  }

  // For Russian
  if (locale === "ru") {
    const russianField = `${fieldName}Ru`;
    return item[russianField] || item[fieldName] || "";
  }

  // For Armenian
  if (locale === "am") {
    const armenianField = `${fieldName}Am`;
    return item[armenianField] || item[fieldName] || "";
  }

  // Default fallback
  return item[fieldName] || "";
}

/**
 * Get localized title with fallback
 *
 * @param {Object} item - The object containing title fields
 * @param {string} locale - Current locale
 * @returns {string} - Localized title
 */
export function getLocalizedTitle(item, locale) {
  return getLocalizedField(item, "title", locale);
}

/**
 * Get localized description with fallback
 *
 * @param {Object} item - The object containing description fields
 * @param {string} locale - Current locale
 * @returns {string} - Localized description
 */
export function getLocalizedDescription(item, locale) {
  return getLocalizedField(item, "description", locale);
}

/**
 * Get localized name with fallback
 *
 * @param {Object} item - The object containing name fields
 * @param {string} locale - Current locale
 * @returns {string} - Localized name
 */
export function getLocalizedName(item, locale) {
  return getLocalizedField(item, "name", locale);
}
