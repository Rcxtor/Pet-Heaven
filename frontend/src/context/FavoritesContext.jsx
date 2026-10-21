
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useAuth } from "./AuthContext";
import { getFavorites } from "../services/petService";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
    const { token } = useAuth();

    const [favoriteIds, setFavoriteIds] = useState(new Set());
    const [loading, setLoading] = useState(false);

    const refreshFavorites = useCallback(async () => {
        if (!token) {
            setFavoriteIds(new Set());
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            const favorites = await getFavorites();

            setFavoriteIds(
                new Set(
                    favorites.map((favorite) =>
                        Number(favorite.pet_id ?? favorite.pet?.id)
                    )
                )
            );
        } catch (error) {
            console.error("Failed to load favorites:", error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            if (!token) {
                setFavoriteIds(new Set());
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                const favorites = await getFavorites();

                if (!cancelled) {
                    setFavoriteIds(
                        new Set(
                            favorites.map((favorite) =>
                                Number(favorite.pet_id ?? favorite.pet?.id)
                            )
                        )
                    );
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("Failed to load favorites:", error);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, [token]);

    const isFavorite = useCallback(
        (petId) => favoriteIds.has(Number(petId)),
        [favoriteIds]
    );

    const addFavoriteLocally = useCallback((petId) => {
        setFavoriteIds((previous) => {
            const next = new Set(previous);
            next.add(Number(petId));
            return next;
        });
    }, []);

    const removeFavoriteLocally = useCallback((petId) => {
        setFavoriteIds((previous) => {
            const next = new Set(previous);
            next.delete(Number(petId));
            return next;
        });
    }, []);

    return (
        <FavoritesContext.Provider
            value={{
                favoriteIds,
                isFavorite,
                loading,
                refreshFavorites,
                addFavoriteLocally,
                removeFavoriteLocally,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error(
            "useFavorites must be used inside FavoritesProvider"
        );
    }

    return context;
}
