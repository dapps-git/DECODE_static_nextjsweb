/**
 * Automatically formats Indian vehicle license plates with appropriate spacing.
 * Supports:
 * - Standard state-wise plates (e.g. KL 01 A 1234, MH 12 CD 3456, DL 04 C 9999, KL 65 4037)
 * - Bharat series (e.g. 22 BH 1234 AA)
 * - Any 2-letter state code + RTO + optional Series + 1-4 Digits
 */
export function formatVehiclePlate(val) {
  if (!val) return '';
  const clean = val.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!clean) return '';

  // 1. Standard Indian: 2 Letters (State) + 1-2 Digits (RTO) + 0-3 Letters (Series) + 1-4 Digits (Number)
  const standard = clean.match(/^([A-Z]{2})(\d{1,2})([A-Z]{0,3})(\d{0,4})$/);
  if (standard) {
    return [standard[1], standard[2], standard[3], standard[4]].filter(Boolean).join(' ');
  }

  // 2. Bharat (BH) Series: 2 Digits + "BH" + 4 Digits + 1-2 Letters
  const bhMatch = clean.match(/^(\d{2})(BH)(\d{0,4})([A-Z]{0,2})$/);
  if (bhMatch) {
    return [bhMatch[1], bhMatch[2], bhMatch[3], bhMatch[4]].filter(Boolean).join(' ');
  }

  // 3. Partial progression while user is typing
  if (/^[A-Z]{1,2}$/.test(clean)) return clean;
  const partial = clean.match(/^([A-Z]{2})(\d+)(.*)$/);
  if (partial) {
    return [partial[1], partial[2], partial[3]].filter(Boolean).join(' ');
  }

  return clean;
}
