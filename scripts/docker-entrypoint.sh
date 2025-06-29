#!/bin/sh
set -e

echo "🐳 Démarrage du container Angular..."

# Vérification et correction automatique du store pnpm
if [ -d "node_modules" ]; then
    echo "📦 Vérification de la cohérence des node_modules..."
    
    # Test plus précis : essayer d'ajouter une dépendance factice
    echo "🔍 Test de cohérence du store pnpm..."
    if ! pnpm add --dry-run lodash > /dev/null 2>&1; then
        echo "⚠️  Détection d'un conflit de store pnpm, correction automatique..."
        echo "🔄 Réinstallation des dépendances avec le store correct..."
        rm -rf node_modules .pnpm-store 2>/dev/null || true
        pnpm install
        echo "✅ Dépendances réinstallées avec succès !"
    else
        echo "✅ Store pnpm cohérent, pas de réinstallation nécessaire"
    fi
else
    echo "📦 Installation initiale des dépendances..."
    pnpm install
    echo "✅ Installation terminée !"
fi

echo "🚀 Lancement de l'application Angular..."

# Exécution de la commande passée en paramètre
exec "$@" 