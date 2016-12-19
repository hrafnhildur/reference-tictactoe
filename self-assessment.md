## Scripts

- Docker build: bashScript.sh

- Docker compose: docker-compose.yaml

- AWS Provisioning: deployScript.sh

- Other: cleanDocker.sh

## Testing & logic

Outline what tests you created.

- UnitTests, server logic TDD (Git commit log)

- Is the game playable? : no


## Data migration

Did you create a data migration.

- no


## Jenkins

Do you have the following Jobs and what happens in each Job:

- Commit Stage: Yes, after each change commited to GitHub, Jenkins server builds the application.

- Acceptance Stage: Yes, after a successful commit job, Jenkins runs another script and pushes the application on my amazon instance.


Did you use any of the following features in Jenkins?

- Schedule or commit hooks: yes

- Pipeline: yes

- Jenkins file: yes


## Monitoring

Did you do any monitoring?

- no


## Other

Anything else you did to improve you deployment pipeline of the project itself?

- no