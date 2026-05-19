FROM public.ecr.aws/amazoncorretto/amazoncorretto:17
WORKDIR /app
RUN mkdir -p /app/uploads
COPY target/api-0.0.1-SNAPSHOT.jar /app/app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
