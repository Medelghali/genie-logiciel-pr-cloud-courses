{
    "type": "TPStatement",
    "reference": "tp-dba-etape-creation-db",
    "is_pdf": false
}
---

# Oracle Database Setup and Management Guide

This guide outlines the steps to create an Oracle database instance, configure users and tablespaces, create sample tables, and perform cleanup operations. The steps are based on a Windows environment.

---

## 1. Set Up the Oracle Instance

First, set the Oracle SID and create a new database instance.

```cmd
SET ORACLE_SID=master
oradim -new -sid master -startmode=manual
```

- `SET ORACLE_SID=master` – Defines the system identifier for the database.
- `oradim -new -sid master -startmode=manual` – Creates a new Windows service for the Oracle instance with manual startup mode.

---

## 2. Start the Database

Launch SQL*Plus as `sysdba` and start the database using a parameter file.

```sql
sqlplus /nolog
connect sys as sysdba
startup pFile=c:\db\init_master.ora
```

- `pFile=c:\db\init_master.ora` – Specifies the location of the initialization parameter file.

After startup, grant basic privileges to the `system` user.

```sql
grant connect to system identified by 2026;
```

---

## 3. Create Tablespace and Run `pupbld.sql`

Open a new command prompt and connect as `system` using the password `2026`.

```cmd
sqlplus /nolog
connect system
-- Enter password: 2026
```

Then create a tablespace and run the `pupbld.sql` script (usually located in `$ORACLE_HOME/sqlplus/admin`).

```sql
create tablespace Master_tables
  datafile 'c:\db\master_tables.dbf'
  size 5m
  extent management local uniform size 128k;

@?\sqlplus\admin\pupbld.sql
```

- `?\sqlplus\admin\pupbld.sql` – The `?` is a placeholder for the Oracle home directory. This script creates the `PRODUCT_PROFILE` table used by SQL*Plus.

---

## 4. Create User `ali` and Grant Privileges

```sql
grant connect, resource to ali identified by ali26;
alter user ali default tablespace master_tables;
```

- `ali` now has the `connect` and `resource` roles, and `master_tables` is set as the default tablespace.

---

## 5. Create Tables and Insert Data

Connect as `ali` in a new command prompt.

```sql
connect ali
-- Enter password: ali26
```

Create the `intervenant` table.

```sql
create table intervenant (
  Numinterv number(4) primary key,
  nominterv varchar2(10),
  prenominterv varchar2(10),
  adresse varchar2(30)
);
```

Create the `cours` table with a foreign key referencing `intervenant`.

```sql
create table cours(
  numcours number(4) primary key,
  titre varchar2(50),
  intervenant number(4) references intervenant(Numinterv)
);
```

Insert sample data.

```sql
insert into intervenant values(1, 'alaoui', 'aziz', 'kenitra');
insert into intervenant values(2, 'nassiri', 'fatima', 'Rabat');
insert into intervenant values(3, 'ibrahimi', 'ilyass', 'fes');

insert into cours values(20, 'JAVA', 1 );
insert into cours values(21, 'BD', 3 );
insert into cours values(22, 'UML', 2 );
insert into cours values(23, 'XML', 2 );
insert into cours values(24, 'C++', 1 );
```

---

## 6. Create User `etudiant` with Quota and Expired Password

Connect as `system` (or `sys`) and create a new user.

```sql
create user etudiant
  identified by azerty
  default tablespace master_tables
  temporary tablespace master_temp
  quota 128k ON master_tables
  password expire;
```

- `password expire` forces the user to change the password on first login.

> **Note:** The tablespace `master_temp` must already exist. If not, create it beforehand.

---

## 7. Modify User `etudiant`

In a new command prompt, connect as `etudiant`. The password will be expired, so you will be prompted to change it.

```sql
connect etudiant
-- Old password: azerty
-- New password: 789
-- Retype new password: 789
```

Alternatively, an administrator can alter the user directly.

```sql
alter user etudiant identified by 789 password expire;
-- The user will be forced to change again on next login.
```

To increase the quota on `master_tables`:

```sql
alter user etudiant quota 4m on master_tables;
```

---

## 8. Cleanup – Drop the Database

Connect as `sysdba` to shut down and drop the database, then delete the instance.

```sql
connect sys as sysdba
shutdown abort
startup mount exclusive restrict pFile=c:\db\init_master.ora
drop database;
```

Exit SQL*Plus and remove the Windows service.

```cmd
oradim -delete -sid master
```

- `shutdown abort` – Forces an immediate shutdown (use with caution).
- `startup mount exclusive restrict` – Brings the database to mount mode in exclusive and restricted access, required before dropping.
- `drop database` – Deletes all datafiles, control files, and redo logs.
- `oradim -delete -sid master` – Removes the Oracle service from Windows.


