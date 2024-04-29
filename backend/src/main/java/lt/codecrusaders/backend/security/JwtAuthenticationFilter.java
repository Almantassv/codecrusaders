package lt.codecrusaders.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lt.codecrusaders.backend.repositories.UserRepository;
import lt.codecrusaders.backend.model.entity.User;
import lt.codecrusaders.backend.services.UserService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider = new TokenProvider();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        try {
            Optional<String> JWTToken = extractJWT(request);
            JWTToken.flatMap(tokenProvider::validateToken).ifPresent(jws -> {
                UserService userService = new UserService(userRepository);
                String username = jws.getBody().getSubject();
                User user = userService.getUserByUsername(username);
                if (user != null) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user.getUsername(), null, user.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            });
        } catch (Exception e) {
            log.error("Authentication error", e);
        }
        chain.doFilter(request, response);
    }

    private Optional<String> extractJWT(HttpServletRequest request) {
        String tokenHeader = request.getHeader("Authorization");
        if (StringUtils.hasText(tokenHeader) && tokenHeader.startsWith("Bearer ")) {
            return Optional.of(tokenHeader.replace("Bearer ", ""));
        }
        return Optional.empty();
    }
}
