
🌍 Projet : Plateforme de réservation de vols et d’hôtels (Full Stack)

Technologies
	•	Front-end : React (pages, composants, routing, formulaires, fetch API)
	•	Back-end : Node.js + Express
	•	Base de données : PostgreSQL ou SQLite
	•	API externe :
	•	Ex. Amadeus API ou AviationStack API pour les vols
	•	Hotels API (comme RapidAPI ou TripAdvisor API) pour les hôtels

⸻

Fonctionnalités principales

✈️ 1. Recherche de vols
	•	Champ de saisie pour ville de départ, destination et date
	•	Le back-end appelle une API externe de vols et retourne les résultats (compagnie, heure, prix, durée)
	•	L’utilisateur peut filtrer ou trier les vols par prix ou compagnie

🏨 2. Recherche d’hôtels
	•	Recherche d’hôtels dans la ville de destination
	•	Affichage de la note moyenne, prix par nuit, distance du centre
	•	Sélection possible d’un hôtel pour la réservation

💼 3. Réservation
	•	L’utilisateur choisit un vol et un hôtel
	•	Envoi d’une requête POST /api/bookings pour sauvegarder la réservation en base de données
	•	Génération d’un récapitulatif de réservation (nom, date, prix total, références)

🗂️ 4. Gestion des réservations
	•	GET /api/bookings : afficher les réservations passées
	•	DELETE /api/bookings/:id : annuler une réservation
	•	(Optionnel) : PUT /api/bookings/:id pour modifier la date ou l’hôtel

⸻

API utilisées
	•	AviationStack / Amadeus pour les vols (données en temps réel sur les compagnies et horaires)
	•	OpenWeather (optionnel) pour afficher la météo du lieu de destination
	•	FakeStoreAPI ou Stripe API (test) pour simuler un paiement

⸻

Structure du projet

/backend
  ├── server.js
  ├── routes/
  │    ├── flights.js
  │    ├── hotels.js
  │    └── bookings.js
  ├── controllers/
  ├── database/
  │    ├── schema.sql
  │    └── db.js
/frontend
  ├── src/
  │    ├── pages/
  │    ├── components/
  │    └── api/

