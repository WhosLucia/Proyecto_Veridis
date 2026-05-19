// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

export function obtenerIniciales(nombre?: string, email?: string) {
  if (nombre && nombre.trim().length > 0) {
    const words = nombre.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    const firstInitial = words[0].charAt(0);
    const lastInitial = words[words.length - 1].charAt(0);

    return `${firstInitial}${lastInitial}`.toUpperCase();
  }

  if (email && email.trim().length > 0) {
    return email.charAt(0).toUpperCase();
  }

  return 'U';
}