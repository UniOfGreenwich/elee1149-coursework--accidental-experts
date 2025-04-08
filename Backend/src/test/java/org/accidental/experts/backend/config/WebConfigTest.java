package org.accidental.experts.backend.config;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.web.servlet.config.annotation.CorsRegistration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class WebConfigTest {

    @Test
    void corsConfigurerAppliesSettings() {
        WebConfig webConfig = new WebConfig();
        WebMvcConfigurer configurer = webConfig.corsConfigurer();
        CorsRegistry mockRegistry = Mockito.mock(CorsRegistry.class);
        CorsRegistration mockRegistration = Mockito.mock(CorsRegistration.class);

        when(mockRegistry.addMapping("/**")).thenReturn(mockRegistration);
        when(mockRegistration.allowedOrigins(any(String[].class))).thenReturn(mockRegistration);
        when(mockRegistration.allowedMethods(any(String[].class))).thenReturn(mockRegistration);
        when(mockRegistration.allowedHeaders("*")).thenReturn(mockRegistration);
        when(mockRegistration.allowCredentials(true)).thenReturn(mockRegistration);

        configurer.addCorsMappings(mockRegistry);

        verify(mockRegistry).addMapping("/**");
        ArgumentCaptor<String[]> originsCaptor = ArgumentCaptor.forClass(String[].class);
        verify(mockRegistration).allowedOrigins(originsCaptor.capture());
        assertThat(originsCaptor.getValue()).containsExactlyInAnyOrder("http://localhost:3000", "https://uniofgreenwich.github.io");
        verify(mockRegistration).allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
        verify(mockRegistration).allowedHeaders("*");
        verify(mockRegistration).allowCredentials(true);
    }
}
