package com.cache;

import java.time.Instant;
import java.util.List;

import org.springframework.cache.CacheManager;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.futbolapp.back.dto.MatchDTO;

@Component
public class MatchCacheEvictor {

    private final CacheManager cacheManager;

    public MatchCacheEvictor(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    @Scheduled(fixedRate = 10 * 60 * 1000) // every 10 min
    public void evictIfPastGamesStarted() {
        var cache = cacheManager.getCache("allMatches");
        if (cache == null) return;

        List<MatchDTO> cachedMatches = cache.get("allMatches", List.class);
        if (cachedMatches == null) return;

        boolean anyLiveOrStarted = cachedMatches.stream().anyMatch(match -> {
            try {
                Instant utc = Instant.parse(match.getUtcDate());
                return utc.isBefore(Instant.now());
            } catch (Exception e) {
                return false;
            }
        });

        if (anyLiveOrStarted) {
            cache.clear();
            System.out.println(" Match has started or is live. Cache cleared.");
        }
    }
}
