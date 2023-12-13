import os
import base64
import mysql.connector
import datetime

old_time = datetime.datetime.now()

conn = mysql.connector.connect(
    host="localhost",
    user="cse370_admin",
    password="cse370_pass",
    database="cse370_db",
    auth_plugin='caching_sha2_password'
)


def get_base64_encoded_image(image_path):
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode('utf-8')


folder_dir = "./Sample_Image/"
cursor = conn.cursor()

# section 1
# User profile picture
count: int = 1
for filename in os.listdir(folder_dir):
    if count > 100:
        break
    if filename.endswith(".png") or filename.endswith(".jpg") or filename.endswith(".jpeg"):
        base64_file = get_base64_encoded_image(folder_dir + filename)
        cursor = conn.cursor()
        data_to_insert = {
            'picture': base64_file,
            'user_id': count
        }
        insert_query = "INSERT INTO profile_picture (picture, user_id) VALUES (%s, %s)"
        cursor.execute(
            insert_query, (data_to_insert['picture'], data_to_insert['user_id']))
        conn.commit()
        cursor.close()
        print(
            f'Uploaded into profile_picture for user {count} Time Consumed: {datetime.datetime.now() - old_time}')
        count += 1

# section 2
# Manga Picture
count: int = 1
for filename in os.listdir(folder_dir):
    if count > 100:
        break
    if filename.endswith(".png") or filename.endswith(".jpg") or filename.endswith(".jpeg"):
        base64_file = get_base64_encoded_image(folder_dir + filename)
        cursor = conn.cursor()
        data_to_insert = {
            'mp_picture': base64_file,
            'm_id': count
        }
        insert_query = "INSERT INTO manga_picture (mp_picture, m_id) VALUES (%s, %s)"
        cursor.execute(
            insert_query, (data_to_insert['mp_picture'], data_to_insert['m_id']))
        conn.commit()
        cursor.close()
        print(
            f'Uploaded into manga_picture for manga {count} Time Consumed: {datetime.datetime.now() - old_time}')
        count += 1


# section 3
# Volume Picture
count: int = 1
for filename in os.listdir(folder_dir):
    if count > 300:
        break
    if filename.endswith(".png") or filename.endswith(".jpg") or filename.endswith(".jpeg"):
        base64_file = get_base64_encoded_image(folder_dir + filename)
        cursor = conn.cursor()
        data_to_insert = {
            'vc_picture': base64_file,
            'v_id': count
        }
        insert_query = "INSERT INTO volume_cover (vc_picture, v_id) VALUES (%s, %s)"
        cursor.execute(
            insert_query, (data_to_insert['vc_picture'], data_to_insert['v_id']))
        conn.commit()
        cursor.close()
        print(
            f'Uploaded into volume_cover for Volume {count} Time Consumed: {datetime.datetime.now() - old_time}')
        count += 1


# section 4
# Chapter Picture
count: int = 1
for filename in os.listdir(folder_dir):
    if count > 400:
        break
    if filename.endswith(".png") or filename.endswith(".jpg") or filename.endswith(".jpeg"):
        base64_file = get_base64_encoded_image(folder_dir + filename)
        cursor = conn.cursor()
        data_to_insert = {
            'cc_picture': base64_file,
            'c_id': count
        }
        insert_query = "INSERT INTO chapter_cover (cc_picture, c_id) VALUES (%s, %s)"
        cursor.execute(
            insert_query, (data_to_insert['cc_picture'], data_to_insert['c_id']))
        conn.commit()
        cursor.close()
        print(
            f'Uploaded into chapter_cover for Chapter {count} Time Consumed: {datetime.datetime.now() - old_time}')
        count += 1


# section 5
# Author Picture
count: int = 1
for filename in os.listdir(folder_dir):
    if count > 30:
        break
    if filename.endswith(".png") or filename.endswith(".jpg") or filename.endswith(".jpeg"):
        base64_file = get_base64_encoded_image(folder_dir + filename)
        cursor = conn.cursor()
        data_to_insert = {
            'ap_picture': base64_file,
            'a_id': count
        }
        insert_query = "INSERT INTO author_picture (ap_picture, a_id) VALUES (%s, %s)"
        cursor.execute(
            insert_query, (data_to_insert['ap_picture'], data_to_insert['a_id']))
        conn.commit()
        cursor.close()
        print(
            f'Uploaded into author_picture for author {count} Time Consumed: {datetime.datetime.now() - old_time}')
        count += 1


# section 6
# Publisher Picture
count: int = 1
for filename in os.listdir(folder_dir):
    if count > 10:
        break
    if filename.endswith(".png") or filename.endswith(".jpg") or filename.endswith(".jpeg"):
        base64_file = get_base64_encoded_image(folder_dir + filename)
        cursor = conn.cursor()
        data_to_insert = {
            'pp_picture': base64_file,
            'p_id': count
        }
        insert_query = "INSERT INTO publisher_picture (pp_picture, p_id) VALUES (%s, %s)"
        cursor.execute(
            insert_query, (data_to_insert['pp_picture'], data_to_insert['p_id']))
        conn.commit()
        cursor.close()
        print(
            f'Uploaded into publisher_picture for Publisher {count} Time Consumed: {datetime.datetime.now() - old_time}')
        count += 1


conn.close()
print(f'Total Time: {datetime.datetime.now() - old_time}')
